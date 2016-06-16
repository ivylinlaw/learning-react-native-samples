import React, { Component } from 'react';
import { Image, ImagePickerIOS } from 'react-native';

var styles = require('./style.js');

var Button = require('./../LocationButton/Button');

var PhotoBackdrop = React.createClass({
	getInitialState() {
		return {
			photoSource: require('image!sea')
		}
	},

	_pickImage() {
		ImagePickerIOS.openCameraDialog(
			{},
			(data) => {
				this.setState({
					photoSource: {uri: data}
				});
			},
			() => {
				console.log('User canceled the action');
			});
	},

	render() {
		return (
			<Image
				style={styles.backdrop}
				source={this.state.photoSource}
				resizeMode='cover'>
				{this.props.children}
				<Button
					style={styles.button}
					label="Load Image"
					onPress={this._pickImage}/>
			</Image>
			);
	}
});

module.exports = PhotoBackdrop;