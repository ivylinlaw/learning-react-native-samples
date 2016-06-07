/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image
} from 'react-native';

var Forecast = require('./Forecast');

var WeatherProject = React.createClass({
  getInitialState() {
    return {
      zip: '',
      forecast: null
    };
  },

  _handleTextChange(event) {
    var zip = event.nativeEvent.text;
    // console.log(event.nativeEvent.text);
    this.setState({
      zip: zip
    });

    require('./key'); //???
    fetch('http://api.openweathermap.org/data/2.5/weather?zip=' +
    zip + ',us'
    + '&APPID=' + KEY)
      .then((response) => response.json())
      .then((responseJSON) => {
        console.log(responseJSON);
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp*(9/5)-459.67
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  },

  render() {
    var content = null;
    if(this.state.forecast !== null) {
      content = <Forecast
                  main={this.state.forecast.main}
                  description={this.state.forecast.description}
                  temp={this.state.forecast.temp}/>
    }
    return (
      <View style={styles.container}>
        <Image source={require('image!sea')}
          resizeMode='cover'
          style={styles.backdrop}>
          <View style={styles.overlay}>
            <View style={styles.row}>
              <Text style={styles.mainText}>
                Current weather for
              </Text>
              <View style={styles.zipContainer}>
                <TextInput
                  style={[styles.zipCode, styles.mainText]}
                  returnKeyType='go'
                  onSubmitEditing={this._handleTextChange}/>
              </View>
            </View>
            {content}
          </View>
        </Image>
      </View>
    );
  }
});

var baseFontSize = 16;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 30
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'flex-start',
    padding: 30
  },
  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3
  },
  zipCode: {
    width: 50,
    height: baseFontSize
  },
  mainText: {
    flex: 1,
    fontSize: baseFontSize,
    color: '#FFFFFF'
  }
});

module.exports = WeatherProject;
