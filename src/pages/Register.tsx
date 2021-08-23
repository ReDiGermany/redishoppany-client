import React, { Component } from 'react'
import Navigation from '../Navigation'
import LoginButton from './Login/LoginButton'
import LoginInputEmail from './Login/LoginInputEmail'
import LoginInputPassword from './Login/LoginInputPassword'
import RegisterTitle from './Login/RegisterTitle'

export default class Register extends Component {
  render() {
    return (
      <>
        <Navigation label="Registration" />
        <RegisterTitle />
        <LoginInputEmail
          onSubmit={() => {}}
          onChange={(email, emailValid) => this.setState({ email, emailValid })}
        />
        <LoginInputPassword
          onSubmit={() => {}}
          onChange={(password, passwordValid) =>
            this.setState({ password, passwordValid })
          }
        />
        <LoginInputPassword
          repeat={true}
          onSubmit={() => {}}
          onChange={(password, passwordValid) =>
            this.setState({ password, passwordValid })
          }
        />
        <LoginButton
          checking={false}
          onSubmit={() => {}}
          disabled={false}
          //   disabled={!(this.state.passwordValid && this.state.emailValid)}
        />
      </>
    )
  }
}
