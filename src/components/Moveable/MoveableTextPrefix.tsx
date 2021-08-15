import React, { Component } from 'react'
import { Text } from 'react-native'
import { textStyle } from '../../styles/MoveableStyle'
import IMoveableTextPrefixProps from '../../interfaces/IMoveableTextPrefixProps'

export default class MoveableTextPrefix extends Component<IMoveableTextPrefixProps> {
  render() {
    const style = {
      ...textStyle.left.prefix,
      ...((this.props.disabled ?? false) && {
        height: 30,
        lineHeight: 30,
        opacity: 0.3,
      }),
    }

    return <Text style={style}>{this.props.text.toString()}</Text>
  }
}
