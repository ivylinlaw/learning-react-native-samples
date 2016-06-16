/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  AsyncStorage
} from 'react-native';

var Forecast = require('./Forecast');
var LocationButton = require('./LocationButton');
var STORAGE_KEY = '@SmarterWeather:zip';
var WEATHER_API_KEY = 'bbbb0eda53258d9697c3092639ffe21c'; //require('./key');
// var API_STEM = '';

// var PhotoBackdrop = require('./PhotoBackdrop/local_image');
// var PhotoBackdrop = require('./PhotoBackdrop/camera_roll_example');
var PhotoBackdrop = require('./PhotoBackdrop');

var WeatherProject = React.createClass({
  getInitialState() {
    return {
      forecast: null
    };
  },

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((value) => {
        if(value !== null) {
          this._getForecastForZip(value);
        }
      })
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();
  },

  _getForecastForZip(zip) {
    AsyncStorage.setItem(STORAGE_KEY, zip)
      .then(() => console.log('Saved selection to disk: ' + zip))
      .catch((error) => console.log('AsyncStorage error: ' + error.message))
      .done();

      this._getForecast('http://api.openweathermap.org/data/2.5/weather?zip='+
        zip+',us'+'&APPID='+WEATHER_API_KEY); //***
  },
   
  _getForecastForCoords(lat, lon) {
    console.log("latitude = "+lat+", longtitude = "+lon);
    this._getForecast('http://api.openweathermap.org/data/2.5/weather?lat='+
      lat+'&lon='+lon+'&APPID='+WEATHER_API_KEY); //***
  },

  _getForecast(url) { //, cb) {
    // fetch('http://api.openweathermap.org/data/2.5/weather?zip=' +
    // zip + ',us'
    // + '&APPID=' + KEY)
    fetch(url)
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

  _handleTextChange(event) {
    var zip = event.nativeEvent.text;
    // console.log(event.nativeEvent.text);
    this._getForecastForZip(zip);    
  },

  render() {
    var content = null;
    if(this.state.forecast !== null) {
      content = (
        <View style={styles.row}>
          <Forecast
            main={this.state.forecast.main}
            description={this.state.forecast.description}
            temp={this.state.forecast.temp}/>
        </View>);
    }

    return (
      <PhotoBackdrop>            
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
              Current weather for
            </Text>
            
            <View style={styles.zipContainer}>
              <TextInput
                style={[styles.zipCode, textStyles.mainText]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}/>
            </View>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastForCoords}/>
          </View>
          {content}
        </View>
      </PhotoBackdrop>
    );
  }
});

var textStyles = require('./styles/typography.js');

var styles = StyleSheet.create({
  overlay: {
    paddingTop: 5,
    backgroundColor: '#000000',
    opacity: 0.5
  },

  row: {
    width: 400,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30
  },

  zipContainer: {
    flex: 1,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginLeft: 5,
    marginTop: 3,
    width: 10
  },

  zipCode: {
    width: 50,
    height: textStyles.baseFontSize
  }
});

module.exports = WeatherProject;
