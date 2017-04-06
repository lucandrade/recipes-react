import React, { Component } from 'react';
import {
    Text,
    ListView,
    ScrollView,
    View,
    Image,
    Platform
} from 'react-native';

import Styles from '../utils/Styles';

export default class Recipe extends Component {
    constructor(props) {
        super(props);
        this.elTop = {};
        this.state = {
            position: 0,
        };
    }

    componentDidMount() {
        const { recipes, recipeId } = this.props;
        const recipe = recipes.recipe || {};

        if (!(recipe.id && recipe.id === recipeId)) {
            this.props.fetchRecipe(recipeId, recipes.list);
        }
    }

    getElementTop(el) {
        const me = this;

        return new Promise((resolve, reject) => {
            if (!me.refs[el]) {
                return reject();
            }

            if (me.elTop[el]) {
                return resolve(me.elTop[el]);
            }

            const element = me.refs[el];

            return element.measure((x, y, w, h, px, py) => {
                me.elTop[el] = y || py;
                return resolve(me.elTop[el]);
            });
        });
    }

    goToElement(el) {
        const me = this;

        if (!me.refs[el]) {
            return;
        }

        me.getElementTop(el)
            .then(y => {
                const scroll = me.refs['recipe-view'];

                if (scroll) {
                    scroll.scrollTo({x: 0, y, animated: true});
                }

                return null;
            });
    }

    updatePosition(event) {
        if (!this.elTop['text']) {
            const me = this;
            me.getElementTop('text')
                .then(() => me.getElementTop('ingredients'));
        }

        if (event && event.nativeEvent && event.nativeEvent.contentOffset && event.nativeEvent.contentOffset.y) {
            this.setState({
                position: event.nativeEvent.contentOffset.y
            });
        }
    }

    renderRecipe(recipe) {
        return (
            <ScrollView ref='recipe-view'>
                <View style={
                    [
                        Styles.container,
                        Styles.containerBordered,
                        Styles.containerShadow,
                        Styles.containerLast
                    ]}>
                    <Image
                        style={{width: '100%', height: 120}}
                        source={{uri: recipe.image}} />
                    <View style={[Styles.containerContentInset]}>
                        <Text style={this.getTitleStyle()}>
                            {recipe.title}
                        </Text>
                        <Text style={this.getDateStyle()}>
                            {recipe.release_at}
                        </Text>
                        <Text style={this.getCategoriesStyle()}>
                            {recipe.categories.map(c => c.name).join(', ')}
                        </Text>
                        <Text ref='text'>
                            MODO DE PREPARO
                        </Text>
                        <Text>
                            {recipe.directions}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    renderMessage(message) {
        return (
            <View style={[Styles.containerContent, Styles.containerBordered, Styles.containerShadow]}>
                <Text>
                    {message}
                </Text>
            </View>
        );
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return this.renderMessage('Erro');
        }

        if (recipes.fetching) {
            return this.renderMessage('Carregando');
        }

        if (!(recipes.recipe && recipes.recipe.id)) {
            return this.renderMessage('Erro ao carregar receita');
        }

        return this.renderRecipe(recipes.recipe);
    }

    renderdd() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return <Text>Erro</Text>;
        }

        if (recipes.fetching) {
            return <Text>Carregando</Text>;
        }

        if (!(recipes.recipe && recipes.recipe.id)) {
            return <Text>Erro ao carregar receita</Text>;
        }

        const { recipe } = recipes;
        const ingredients = this.renderIngredients(recipe.ingredients);

        return (
            <View>
                {this.renderNavigationButtons()}
                <ScrollView
                    ref='recipe-view'
                    style={this.getContainerStyle()}
                    onScroll={this.updatePosition.bind(this)}
                    scrollEventThrottle={16}>
                    <Text style={this.getTitleStyle()}>
                        {recipe.title}
                    </Text>
                    <Text style={this.getDateStyle()}>
                        {recipe.release_at}
                    </Text>
                    <Text style={this.getCategoriesStyle()}>
                        {recipe.categories.map(c => c.name).join(', ')}
                    </Text>
                    {ingredients}
                    <Text ref='text' style={this.getSectionStyle()}>
                        MODO DE PREPARO
                    </Text>
                    <Text style={this.getTextStyle()}>
                        {recipe.directions}
                    </Text>
                </ScrollView>
            </View>
        );
    }

    getButtonNavigationStyle() {
        return {
            flex: 1,
            borderBottomWidth: 1,
            borderBottomColor: '#a09983',
        };
    }

    renderNavigationButtons() {
        const { position } = this.state;
        const { text, ingredients } = this.elTop;

        const containerStyle = {
            flexDirection: 'row',
            alignItems: 'stretch',
            alignSelf: 'stretch',
        };

        const fontStyle = {
            color: '#514e44',
            textAlign: 'center',
            paddingTop: 10,
            paddingBottom: 10,
        };

        const ingredientsStyle = this.getButtonNavigationStyle();
        const textStyle = this.getButtonNavigationStyle();

        if (text && position >= (text*0.6)) {
            textStyle.borderBottomWidth = 3;
        } else if (ingredients && position >= (ingredients*0.6)) {
            ingredientsStyle.borderBottomWidth = 3;
        }

        return (
            <View style={containerStyle}>
                <View style={ingredientsStyle}>
                    <Text
                        onPress={this.goToElement.bind(this, 'ingredients')}
                        style={fontStyle}>
                        INGREDIENTES
                    </Text>
                </View>
                <View style={textStyle}>
                    <Text
                        onPress={this.goToElement.bind(this, 'text')}
                        style={fontStyle}>
                        PREPARO
                    </Text>
                </View>
            </View>
        );
    }

    renderIngredients(ingredients) {
        if (!(ingredients && ingredients.length > 0)) {
            return null;
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(ingredients);

        return (
            <View>
                <Text ref='ingredients' style={this.getSectionStyle()}>
                    INGREDIENTES
                </Text>
                <ListView
                    style={this.getIngredientsListStyle()}
                    dataSource={dataSource}
                    renderRow={this.renderRowIngredient.bind(this)}
                    renderSeparator={this.renderRowIngredientSeparator.bind(this)} />
            </View>
        );
    }

    renderRowIngredient(ingredient) {
        return (
            <Text style={this.getIngredientsItemStyle()}>
                {ingredient.pivot && ingredient.pivot.amount ?
                    `${ingredient.pivot.amount} ${ingredient.name}` :
                    ingredient.name}
            </Text>
        );
    }

    renderRowIngredientSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={this.getIngredientsSeparatorStyle()} />
        );
    }

    getContainerStyle() {
        return {
            padding: 15,
            paddingTop: 25,
        };
    }

    getTitleStyle() {
        return {
            fontWeight: 'bold',
            fontSize: 25,
            textAlign: 'justify',
            color: '#222',
        };
    }

    getDateStyle() {
        return {
            fontStyle: 'italic',
            fontSize: 14,
            fontWeight: '500',
            color: '#555',
        };
    }

    getCategoriesStyle() {
        return {
            fontStyle: 'italic',
            fontSize: 14,
            fontWeight: '700',
            color: 'pink',
            marginBottom: 10,
        };
    }

    getSectionStyle() {
        return {
            backgroundColor: '#edeae3',
            padding: 5,
            color: '#514e44',
            fontSize: 20,
            marginTop: 15,
        };
    }

    getIngredientsListStyle() {
        return {
            backgroundColor: '#f9f8f7',
            marginBottom: 10,
        }
    }

    getIngredientsItemStyle() {
        return {
            color: '#514e44',
            padding: 10,
        };
    }

    getIngredientsSeparatorStyle() {
        return {
            height: 1,
            backgroundColor: '#514e44',
        };
    }

    getTextStyle() {
        return {
            paddingTop: 20,
            paddingBottom: Platform.OS !== 'ios' ? 80 : 50,
        };
    }
}
