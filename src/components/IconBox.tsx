import React from 'react'
import { View } from 'react-native'
import IconBoxStyle from '../styles/IconBoxStyle'
import SafeComponent from './SafeComponent'

export default class IconBox extends SafeComponent<{ disabled?: boolean }> {
  render() {
    const style = {
      ...IconBoxStyle,
      ...(this.props.disabled && { opacity: 0.5 }),
    }

    return <View style={style}>{this.props.children}</View>
  }
}
