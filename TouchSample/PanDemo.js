'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  PanResponder,
  Text,
  View,
} from 'react-native';

var CIRCLE_SIZE = 40;
var CIRCLE_COLOR = 'blue';
var CIRCLE_HIGHLIGHT_COLOR = 'green';

var PanResponderExample = React.createClass({
	_panResponder: {},
	_previousLeft: 0,
	_previousTop: 0,
	_circleStyles: {},
	circle: null,

	getInitialState: function() {
		return {
			numberActiveTouches: 0,
			moveX: 0,
			moveY: 0,
			x0: 0,
			y0: 0,
			dx: 0,
			dy: 0,
			vx: 0,
			vy: 0,
		}
	},

	componentWillMount: function() {
		this._panResponder = PanResponder.create({
			onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
			//onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetResponder: this._handleMoveShouldSetResponder,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderGrant: this._handlePanResponderGrant,
			onPanResponderMove: this._handlePanResponderMove,
			onPanResponderRelease: this._handlePanResponderEnd,
			onPanResponderTerminate: this._handlePanResponderEnd,

			
		});

		this._previousLeft = 20;
		this._previousTop = 84;
		this._circleStyles = {
			left: this._previousLeft,
			top: this._previousTop,
		};
	},

	componentDidMount: function() {
		this._updatePosition();
	},

	render: function() {
		return(
			<View style={styles.container}>
				<View 
					ref={(circle) => {
						this.circle = circle;
					}}
					style={styles.circle}
					{...this._panResponder.panHandlers}/>
				<Text>
					{this.state.numberActiveTouches} touches,
					dx: {this.state.dx},
					dy: {this.state.dy},
					vx: {this.state.vx},
					vy: {this.state.vy}
				</Text>
			</View>
		);
	},

	_highlight: function() {
		this.circle && this.circle.setNativeProps({style: {
			backgroundColor: CIRCLE_HIGHLIGHT_COLOR
		}});
	},

	_unHighlight: function() {
		this.circle && this.circle.setNativeProps({style: {
			backgroundColor: CIRCLE_COLOR
		}});
	},

	_updatePosition: function() {
		this.circle && this.circle.setNativeProps({style: this._circleStyles});
	},

	_handleStartShouldSetResponder: function(e: Object, gesturenState: Object): boolean {
		return true;
	},

	_handleMoveShouldSetResponder: function(e: Object, gesturenState: Object): boolean {
		return true;
	},

	_handlePanResponderGrant: function(e: Object, gesturenState: Object) {
		this._highlight();
	},

	_handlePanResponderMove: function(e: Object, gesturenState: Object) {
		this.setState({
			stateID: gesturenState.stateID,
			moveX: gesturenState.moveX,
			moveY: gesturenState.moveY,
			x0: gesturenState.x0,
			y0: gesturenState.y0,
			dx: gesturenState.dx,
			dy: gesturenState.dy,
			vx: gesturenState.vx,
			vy: gesturenState.vy,
			numberActiveTouches: gesturenState.numberActiveTouches
		});

		this._circleStyles.left = this._previousLeft + gesturenState.dx;
		this._circleStyles.top = this._previousTop + gesturenState.dy;
		this._updatePosition();
	},

	_handlePanResponderEnd: function(e: Object, gesturenState: Object) {
		this._unHighlight();
		this._previousLeft += gesturenState.dx;
		this._previousTop += gesturenState.dy;
	},
});

var styles = StyleSheet.create({
	circle: {
		width: CIRCLE_SIZE,
		height: CIRCLE_SIZE,
		borderRadius: CIRCLE_SIZE / 2,
		backgroundColor: CIRCLE_COLOR,
		position: 'absolute',
		left: 0,
		top: 0,
	},

	container: {
		flex: 1,
		paddingTop: 64,
	},
});

module.exports = PanResponderExample;
