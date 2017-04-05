import React, { Component } from 'react';
import {
    View,
    Text,
    Navigator,
    Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Recipes from '../pages/Recipes';
import Recipe from '../pages/Recipe';
import * as recipesActions from '../actions/recipesActions';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.barHeight = Platform.OS !== 'ios' ? 64 : 80;
    }

    render() {
        return (
            <Navigator
                initialRoute={this.getInitialRoute()}
                sceneStyle={this.getContainerStyle()}
                renderScene={this.renderScene.bind(this)}
                onDidFocus={this.props.actions.finishNavigation}
                navigationBar={this.renderNavigationBar()} />
        );
    }

    getInitialRoute() {
        return {
            id: 'recipes',
            title: 'Receitas'
        };
    }

    getContainerStyle() {
        const paddingTop = this.barHeight;
        const paddingBottom = 30;
        const backgroundColor = 'white';

        return {
            paddingTop,
            paddingBottom,
            backgroundColor
        };
    }

    renderScene(route, navigator) {
        const { state, actions } = this.props;
        switch (true) {
            case /recipe\/\d{0,5}/.test(route.id):
                return <Recipe navigator={navigator} recipeId={route.recipeId} {...state} {...actions} />;
            default:
                return <Recipes navigator={navigator} {...actions}  {...state} />;
        }
    }

    renderNavigationBar() {
        const config = {
            Title: this.renderTitle.bind(this),
            LeftButton: this.renderLeftButton.bind(this),
            RightButton: this.renderRightButton.bind(this)
        };
        return (
            <Navigator.NavigationBar
                routeMapper={config}
                navigationStyles={Navigator.NavigationBar.StylesIOS}
                style={this.getNavigationBarStyle()} />
        );
    }

    getNavigationBarStyle() {
        const backgroundColor = '#00c6bf';
        const height = this.barHeight;

        return {
            backgroundColor,
            height
        };
    }

    renderTitle(route, navigator) {
        const title = route.title || 'Carregando';
        return (
            <View>
                <Text style={this.getTitleStyle()}>
                    {title.length > 20 ? title.substring(0, 20) + '...' : title}
                </Text>
            </View>
        );
    }

    getItemsStyle() {
        const marginTop = Platform.OS !== 'ios' ? 0 : 20;
        const color = 'white';
        const fontSize = 20;

        return {
            marginTop,
            color,
            fontSize
        };
    }

    getTitleStyle() {
        return Object.assign(this.getItemsStyle(), {

        });
    }

    getButtonStyle() {
        const fontSize = 25;
        return Object.assign(this.getItemsStyle(), {
            fontSize
        });
    }

    goBack(navigator) {
        this.props.actions.startNavigation();
        navigator.pop();
    }

    renderLeftButton(route, navigator) {
        const { topbar } = this.props.state;

        if (navigator.getCurrentRoutes().length === 1 || topbar.started) {
            return null;
        }

        return (
            <Text
                style={this.getLeftButtonStyle()}
                onPress={this.goBack.bind(this, navigator)}>
                Voltar
            </Text>
        );
    }

    getLeftButtonStyle() {
        const style = this.getTitleStyle();
        const marginLeft = 10;
        const marginTop = style.marginTop+2;
        const fontSize = 18;

        return Object.assign(style, {
            marginLeft,
            fontSize,
            marginTop
        });
    }

    renderRightButton(route, navigator) {
        return null;
    }
}

export default connect(state => ({
        state,
    }),
    (dispatch) => ({
        actions: bindActionCreators(recipesActions, dispatch)
    })
)(Navigation);
