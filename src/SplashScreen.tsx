import React, { Component } from 'react'
import { Image, View } from 'react-native'

export default class SplashScreen extends Component {
  render() {
    return (
      <View
        style={{ width: '100%', height: '100%', backgroundColor: '#202020' }}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          width={100}
          height={100}
          // eslint-disable-next-line global-require
          source={require('../assets/splash.png')}
          onError={e => console.error(e.nativeEvent.error)}
        />
      </View>
    )
  }
}
