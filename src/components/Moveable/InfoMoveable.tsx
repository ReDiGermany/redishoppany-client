import React from 'react'
import SafeComponent from '../SafeComponent'
import Moveable from './Moveable'

export default class InfoMoveable extends SafeComponent<{
  name: string
  large?: boolean
  bold?: boolean
  center?: boolean
  show?: boolean
  onClick?: () => void
}> {
  render() {
    return this.props.show ?? true ? (
      <Moveable
        name={this.props.name}
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
