import React from 'react'
import { Text } from 'react-native'
import { textStyle } from '../../styles/MoveableStyle'
import IMoveableTextPrefixProps from '../../interfaces/IMoveableTextPrefixProps'
import SafeComponent from '../SafeComponent'

export default class MoveableTextPrefix extends SafeComponent<IMoveableTextPrefixProps> {
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
