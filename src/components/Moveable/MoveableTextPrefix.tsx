import React, { Component } from 'react'
import { Text } from 'react-native'
import { textStyle } from '../../styles/MoveableStyle'

interface IMoveableTextPrefixProps {
  text: string | number
  disabled?: boolean
}

export default class MoveableTextPrefix extends Component<IMoveableTextPrefixProps> {
  render() {
    return (
      <Text
        style={{
          ...textStyle.left.prefix,
          ...(this.props.disabled ?? false
            ? { height: 30, lineHeight: 30, opacity: 0.3 }
            : {}),
        }}
      >
        {this.props.text.toString()}
      </Text>
    )
  }
}
