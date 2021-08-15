import React, { Component } from 'react'
import { ImageBackground } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'

export default class BackgroundImage extends Component {
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
