import React, { Component } from 'react'
import { View } from 'react-native'
import IconBoxStyle from '../styles/IconBoxStyle'

export default class IconBox extends Component<{ disabled?: boolean }> {
  render() {
    const style = {
      ...IconBoxStyle,
      ...(this.props.disabled && { opacity: 0.5 }),
    }

    return <View style={style}>{this.props.children}</View>
  }
}
