/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import { createLogger } from 'redux-logger';

import SplashScreen from 'react-native-splash-screen';
import Navigation from './app/components/Navigation';
import * as reducers from './app/reducers';

const logger = createLogger({});
const createStoreWithMiddleware = applyMiddleware(promise(), thunk, logger)(createStore);

const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class Start extends Component {
    componentDidMount() {
        setTimeout(SplashScreen.hide, 2000);
    }

    render() {
        return (
            <Provider store={store}>
                <Navigation />
            </Provider>
        );
    }
}
