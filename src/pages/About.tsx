import React, { Component } from 'react'
import { View } from 'react-native'
import IAPIUserMe from '../interfaces/IAPIUserMe'
import Navigation from '../Navigation'

interface IAboutProps {
  user?: IAPIUserMe
}

export default class About extends Component<IAboutProps> {
  render() {
    return (
      <View>
        <Navigation user={this.props.user} label="About" />
      </View>
    )
  }
}
