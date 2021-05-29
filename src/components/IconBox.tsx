import React, { Component } from 'react'
import { View } from 'react-native'
import IconBoxStyle from '../styles/IconBoxStyle'

export default class IconBox extends Component {
  render() {
    return <View style={IconBoxStyle}>{this.props.children}</View>
  }
}
