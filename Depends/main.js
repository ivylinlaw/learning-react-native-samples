import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var Video = require('react-native-video');

var HelloWorld = require('./HelloWorld');;
HelloWorld.greeting('Sup');

var MainSample = React.createClass({
	render() {
		return(
			<View>
				<Video soudrce={{uri: 'big_buck_bunny'}}
					rate={1.0}
					volume={1.0}
					muted={false}
					paused={false}
					resizeMode="cover"
					repeat={true}
					style={styles.backgroundVideo}/>
			</View>
			);
	}
});

var styles = StyleSheet.create({
	backgroundVideo: {
		//
	},
});

module.exports = MainSample;