import React, { Component } from 'react'
import { Image, Text, View } from 'react-native'
import GlobalStyles from './styles/GlobalStyles'

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
          source={require('../assets/splash_white.png')}
          onError={e => console.error(e.nativeEvent.error)}
        />
        <Text
          style={{
            position: 'absolute',
            bottom: GlobalStyles.appHeight / 10,
            fontWeight: 'bold',
            textAlign: 'center',
            width: GlobalStyles.appWidth,
            left: 0,
            color: '#fff',
          }}
        >
          Loading...
        </Text>
      </View>
    )
  }
}
