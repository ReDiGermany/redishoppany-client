import React from 'react'
import { ImageBackground } from 'react-native'
import GlobalStyles from '../styles/GlobalStyles'
import SafeComponent from './SafeComponent'

export default class BackgroundImage extends SafeComponent<{ image?: number }> {
  render() {
    const backgrounds = [
      require(`../../assets/background.jpg`),
      require(`../../assets/background2.png`),
      require(`../../assets/background3.png`),
      require(`../../assets/background4.png`),
      require(`../../assets/background5.png`),
      require(`../../assets/background6.png`),
      require(`../../assets/background7.png`),
      require(`../../assets/background8.png`),
      require(`../../assets/background9.png`),
      require(`../../assets/background10.png`),
      require(`../../assets/background11.png`),
    ]

    return (
      <ImageBackground
        source={backgrounds[this.props.image ?? 0]}
        resizeMode="cover"
        style={{ width: GlobalStyles().appWidth }}
      >
        {this.props.children}
      </ImageBackground>
    )
  }
}
