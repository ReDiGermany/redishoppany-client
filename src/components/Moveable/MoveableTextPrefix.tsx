import React, { Component } from 'react'
import { Text } from 'react-native'
import { textStyle } from '../../styles/MoveableStyle'

interface IMoveableTextPrefixProps {
  text: string | number
}

export default class MoveableTextPrefix extends Component<IMoveableTextPrefixProps> {
  render() {
    return (
      <Text style={textStyle.left.prefix}>{this.props.text.toString()}</Text>
    )
  }
}
