import React, { Component } from 'react';
import {
    Text
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ReloadButton extends Component {
    render() {
        return (
            <Icon
                style={this.getIconStyle()}
                name="refresh"
                onPress={this.props.onPress}>
            </Icon>
        );
    }

    getIconStyle() {
        return {
            backgroundColor: '#f2f2f2',
            alignSelf: 'center',
            borderRadius: 32,
            fontSize: 44,
            padding: 10,
            color: '#333'
        };
    }
}
