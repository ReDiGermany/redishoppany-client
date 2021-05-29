import React, { Component } from 'react'
import { View } from 'react-native'
import IPageProps from '../interfaces/IPageProps'
import Navigation from '../Navigation'

export default class Settings extends Component<IPageProps> {
  render() {
    return (
      <View>
        <Navigation user={this.props.user} label="Einstellungen" />
      </View>
    )
  }
}
