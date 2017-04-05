import React, { Component } from 'react';
import {
    View,
    Text,
    ListView,
    TouchableHighlight
} from 'react-native';

import ReloadButton from '../components/ReloadButton';

export default class Recipes extends Component {
    componentDidMount() {
        const { recipes } = this.props;

        if (!recipes.fetched && !recipes.fetching) {
            this.props.fetchList();
        }
    }

    nextPage() {
        const { recipes } = this.props;
        const page = recipes.page ? recipes.page+1 : 1;
        this.props.fetchList(page);
    }

    goToRecipe(data) {
        this.props.startNavigation();
        this.props.navigator.push({
            id: `recipe/${data.id}`,
            title: data.title,
            recipeId: data.id
        });
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return <Text>Erro</Text>;
        }

        if ((!(recipes.list && recipes.list.length) && recipes.fetching) || recipes.page === 0) {
            return <Text>Carregando</Text>;
        }

        if (!(recipes.list && recipes.list.length)) {
            return <Text>Erro ao carregar receita</Text>;
        }

        let reloadButton = null;

        if (!recipes.fetching) {
            reloadButton = <ReloadButton onPress={this.nextPage.bind(this)} />;
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        const dataSource = ds.cloneWithRows(recipes.list);
        return (
            <View style={{paddingBottom: 40}}>
                <ListView style={{padding: 10, paddingBottom: 30}}
                    dataSource={dataSource}
                    renderRow={this.renderRow.bind(this)}
                    renderSeparator={this.renderRowSeparator} />
                {reloadButton}
            </View>
        );
    }

    renderRow(data) {
        const titleStyle = {
            fontWeight: 'bold',
            marginBottom: 10,
            fontSize: 20
        };

        const text = data.directions.length > 120 ?
            data.directions.substring(0, 120) + '...' :
            data.directions;

        return (
            <TouchableHighlight onPress={this.goToRecipe.bind(this, data)}>
                <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <Text style={titleStyle}>{data.title}</Text>
                    <Text>{text}</Text>
                </View>
            </TouchableHighlight>
        );
    }

    renderRowSeparator(sectionID, rowID, adjacentRowHighlighted) {
        const style = {
            height: adjacentRowHighlighted ? 4 : 1,
            backgroundColor: adjacentRowHighlighted ? '#3B5998' : '#CCCCCC',
        };
        return (
            <View
                key={`${sectionID}-${rowID}`}
                style={style} />
        );
    }
}
