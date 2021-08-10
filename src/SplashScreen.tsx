import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import Language from './language/Language'
import SplashScreenStyles from './styles/SplashScreenStyles'

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={SplashScreenStyles.container}>
        <Image
          style={SplashScreenStyles.image}
          source={require('../assets/splash_white.png')}
        />
        <Text style={SplashScreenStyles.text}>
          {Language.get('app.loading')}
        </Text>
      </View>
    )
  }
}
