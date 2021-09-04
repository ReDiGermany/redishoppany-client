import React from 'react'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'

export default class PhoneNotConnected extends SafeComponent<{
  connected?: boolean
}> {
  render() {
    return (this.props.connected ?? true) === false ? (
      <Moveable
        name="Phone not Connected"
        bgColor="rgba(255,0,0,.2)"
        icon="exclamation"
        large={true}
        boldText={true}
      />
    ) : (
      <></>
    )
  }
}
