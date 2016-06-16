import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

var styles = require('../styles/typography.js');

var Forecast = React.createClass({
  render() {
    return(
      <View style={forecastStyles.forecast}>
        <Text style={styles.bigText}>
          {this.props.main}
        </Text>
        <Text style={styles.mainText}>
          Current conditions: {this.props.description}
        </Text>
        <Text style={styles.bigText}>
          {this.props.temp.toFixed(2)}°F
        </Text>
      </View>
    );
  }
});

var forecastStyles = StyleSheet.create({
  forecast: {
    alignItems: 'center'
  }
});

module.exports = Forecast;
