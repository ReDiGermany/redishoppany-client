import React from 'react'
import { ViewStyle } from 'react-native'
import Language from '../../language/Language'
import SafeComponent from '../SafeComponent'
import Moveable from './Moveable'

export default class InfoMoveable extends SafeComponent<{
  name: string
  large?: boolean
  bold?: boolean
  center?: boolean
  style?: ViewStyle
  show?: boolean
  onClick?: () => void
}> {
  render() {
    return this.props.show ?? true ? (
      <Moveable
        style={this.props.style}
        name={Language.getOrText(this.props.name)}
        large={this.props.large ?? true}
        centerText={this.props.center ?? true}
        boldText={this.props.bold ?? true}
        disabled={this.props.onClick === undefined}
        onClick={() => this.props.onClick?.()}
      />
    ) : (
      <></>
    )
  }
}
