import React, { Component } from 'react'
import { View } from 'react-native'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'

export default class Imprint extends Component<IPageProps> {
  render() {
    return (
      <View>
        <Navigation label="Impressum" />
      </View>
    )
  }
}
