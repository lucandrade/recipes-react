import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    ListView,
    Image,
    TouchableHighlight
} from 'react-native';

import Styles from '../utils/Styles';
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

    renderMessage(message) {
        return (
            <View style={[Styles.containerContent, Styles.containerBordered, Styles.containerShadow]}>
                <Text>
                    {message}
                </Text>
            </View>
        );
    }

    renderHeader(recipes) {
        return (
            <View style={[
                Styles.containerContent,
                Styles.containerBordered,
                Styles.containerShadow,
                {flexDirection: 'row', alignItems: 'center'}]}>
                <Text>
                    {recipes.total} receitas
                </Text>
                <TextInput
                    value={recipes.filter || ''}
                    underlineColorAndroid={'transparent'}
                    placeholder={'Buscar'}
                    onSubmitEditing={this.sendFilter.bind(this)}
                    onChangeText={this.updateFilter.bind(this)}
                    style={Styles.listInput} />
            </View>
        );
    }

    renderRecipes(recipes) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        const dataSource = ds.cloneWithRows(recipes.list);
        return (
            <View style={[Styles.containerContent, Styles.containerBordered, Styles.containerShadow, {flex: 1}]}>
                <ListView
                    dataSource={dataSource}
                    renderRow={this.renderRecipe.bind(this)}
                    onEndReachedThreshold={10}
                    onEndReached={this.loadNextPage.bind(this)} />
            </View>
        );
    }

    renderRecipe(data) {
        return (
            <TouchableHighlight
                underlayColor={'transparent'}
                activeOpacity={1}
                onPress={this.goToRecipe.bind(this, data)}>
                <View style={Styles.listRow}>
                    <View>
                        <Image
                            style={Styles.listImage}
                            source={{uri: 'http://localhost:8000/receita.jpg'}} />
                    </View>
                    <View style={Styles.listText}>
                        <Text style={Styles.listTitle}>
                            {data.title}
                        </Text>
                        <Text style={Styles.listSubTitle}>
                            Tipo: {data.categories.map(c => c.name).join(', ')}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        const { recipes } = this.props;

        if (recipes.error !== null) {
            return this.renderMessage('Erro ao carregar receitas');
        }

        if ((!(recipes.list && recipes.list.length) && recipes.fetching) || recipes.page === 0) {
            return this.renderMessage('Carregando');
        }

        let listView = null;

        if (recipes.list && recipes.list.length) {
            listView = this.renderRecipes(recipes);
        }

        return (
            <View style={Styles.listContainer}>
                {this.renderHeader(recipes)}
                {listView}
            </View>
        );

        let loading = `Exibindo ${recipes.list.length}`;

        if (recipes.fetching) {
            loading = 'Carregando';
        }

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
}
