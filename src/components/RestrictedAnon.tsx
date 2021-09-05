import React from 'react'
import { RedirectIfPossible } from '../Router/react-router'
import Moveable from './Moveable/Moveable'
import SafeComponent from './SafeComponent'

export default class RestrictedAnon extends SafeComponent {
  state = {
    redirect: '',
  }

  render() {
    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        <Moveable
          name="Du must eingeloggt sein,"
          secondText="um diese Seite nutzen zu können"
          large={true}
          style={{ marginTop: 10 }}
          centerText={true}
          boldText={true}
          bgColor="rgba(255,0,0,.1)"
          disabled={true}
        />
        <Moveable
          name="Einloggen"
          large={true}
          icon="sign-in-alt"
          onClick={() => this.setState({ redirect: '/login' })}
        />
      </>
    )
  }
}
