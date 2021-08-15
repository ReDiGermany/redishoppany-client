import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Navigation from '../Navigation'
import IAboutProps from '../interfaces/IAboutProps'

export default class About extends Component<IAboutProps> {
  render() {
    return (
      <View>
        <Navigation user={this.props.user} label="About" />
        <Text style={{ color: '#fff', padding: 20 }}>
          https://pixabay.com/de/photos/hochzeitsfeier-bankett-geschirr-1967373/
        </Text>
      </View>
    )
  }
}
