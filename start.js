/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

export default class Start extends Component {
    componentDidMount() {
        setTimeout(SplashScreen.hide, 2000);
    }

    render() {
        return (
            <Text>
                Welcome to React Native!
            </Text>
        );
    }
}
