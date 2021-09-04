import React from 'react'
import IAPIUserMe from '../interfaces/IAPIUserMe'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'

export default class AnonAlert extends SafeComponent<{ user?: IAPIUserMe }> {
  render() {
    return this.props.user?.profile.isAnon ? (
      <Moveable
        disabled={true}
        large={true}
        name="Achtung: Sie sind Anonym eingeloggt!"
        secondText="Sollten Sie sich ausloggen, sind alle Daten verloren!"
      />
    ) : (
      <></>
    )
  }
}
