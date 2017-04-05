import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
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

        this.filterTimer = null;
    }

    loadNextPage() {
        const { recipes } = this.props;

        if (!recipes.fetching && recipes.list.length < recipes.total) {
            const page = recipes.page ? recipes.page+1 : 1;
            this.props.fetchList(page, recipes.filter);
        }
    }

    goToRecipe(data) {
        this.props.startNavigation();
        this.props.navigator.push({
            id: `recipe/${data.id}`,
            title: data.title,
            recipeId: data.id
        });
    }

    sendFilter() {
        const me = this;
        const { recipes } = me.props;

        if (me.filterTimer) {
            clearTimeout(me.filterTimer);
        }

        me.props.fetchList(1, recipes.filter);
    }

    updateFilter(text) {
        const me = this;
        me.props.setFilter(text);

        if (me.filterTimer) {
            clearTimeout(me.filterTimer);
        }

        me.filterTimer = setTimeout(() => {
            me.props.fetchList(1, text);
        }, 1000);
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return (
                <View>
                    <Text>Erro ao carregar receita</Text>
                    <ReloadButton onPress={this.props.fetchList} />
                </View>
            );
        }

        if ((!(recipes.list && recipes.list.length) && recipes.fetching) || recipes.page === 0) {
            return <Text>Carregando</Text>;
        }

        let listView = null;

        if (recipes.list && recipes.list.length) {
            const ds = new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2
            });
            const dataSource = ds.cloneWithRows(recipes.list);
            listView = <ListView style={{paddingLeft: 10, paddingRight: 10}}
                dataSource={dataSource}
                renderRow={this.renderRow.bind(this)}
                renderSeparator={this.renderRowSeparator}
                onEndReachedThreshold={10}
                onEndReached={this.loadNextPage.bind(this)} />;
        }

        let loading = `Exibindo ${recipes.list.length}`;

        if (recipes.fetching) {
            loading = 'Carregando';
        }

        const inputStyle = {
            marginLeft: 10,
            padding: 0,
            paddingLeft: 5,
            paddingRight: 5,
            borderColor: '#888',
            borderWidth: 1,
            borderRadius: 5,
            flex: 1
        };

        return (
            <View style={{flexDirection: 'column', justifyContent: 'flex-start', flex: 1}}>
                <View style={{padding: 10, flexDirection: 'row', alignItems: 'center'}}>
                    <Text>
                        {recipes.total} receitas
                    </Text>
                    <TextInput
                        value={recipes.filter || ''}
                        underlineColorAndroid={'transparent'}
                        placeholder={'Buscar'}
                        onSubmitEditing={this.sendFilter.bind(this)}
                        onChangeText={this.updateFilter.bind(this)}
                        style={inputStyle} />
                </View>
                {listView}
                <View style={{padding: 10}}>
                    <Text>{loading}</Text>
                </View>
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
