'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';

var styles = StyleSheet.create({
	bookItem: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#FFFFFF',
		borderBottomColor: '#AAAAAA',
		borderBottomWidth: 2,
		padding: 2
	},

	cover: {
		flex: 1,
		height: 130,
		resizeMode: 'contain'
	},

	info: {
		flex: 3,
		alignItems: 'flex-end',
		flexDirection: 'column',
		alignSelf: 'center',
		padding: 20
	},

	author: {
		fontSize: 16
	},

	title: {
		fontSize: 18,
		fontWeight: 'bold'
	},
});

var BookItem = React.createClass({
	propTypes: {
		coverURL: React.PropTypes.string.isRequired,
		author: React.PropTypes.string.isRequired,
		title: React.PropTypes.string.isRequired
	},

	render: function() {
		return (
			<View style={styles.bookItem}>
				<Image style={styles.cover} source={{uri: this.props.coverURL}}/>
				<View style={styles.info}>
					<Text style={styles.author}>{this.props.author}</Text>
					<Text style={styles.title}>{this.props.title}</Text>
				</View>
			</View>
			);
	}
});

module.exports = BookItem;