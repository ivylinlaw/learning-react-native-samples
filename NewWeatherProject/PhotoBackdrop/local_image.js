import React, { Component } from 'react';
import { Image } from 'react-native';

var styles = require('./style.js');

var PhotoBackdrop = React.createClass({
	render() {
		return (
			<Image
				style={styles.backdrop}
				source={require('image!sea')}
				resizeMode='cover'>
				{this.props.children}
			</Image>
			);
	}
});

module.exports = PhotoBackdrop;