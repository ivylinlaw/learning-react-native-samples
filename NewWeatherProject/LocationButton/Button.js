import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight
} from 'react-native';

var styles = require('./styles.js');

var Button = React.createClass({
	propTypes: {
		onPress: React.PropTypes.func,
		label: React.PropTypes.string
	},

	render() {
		return (
			<TouchableHighlight onPress={this.props.onPress}>
				<View style={[styles.button, this.props.style]}>
					<Text>
						{this.props.label}
					</Text>
				</View>
			</TouchableHighlight>
			);
	}
});

module.exports = Button;