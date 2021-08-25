import React from 'react'
import { ImageBackground } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import SafeComponent from './SafeComponent'

export default class BackgroundImage extends SafeComponent {
  render() {
    return (
      <ImageBackground
        source={require('../../assets/background.jpg')}
        resizeMode="cover"
        style={{ width: GlobalStyles().appWidth }}
      >
        {this.props.children}
      </ImageBackground>
    )
  }
}
