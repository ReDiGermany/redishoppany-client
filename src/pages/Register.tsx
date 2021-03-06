import React from 'react'
import { Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Alert from '../components/Alert'
import BackgroundImage from '../components/BackgroundImage'
import APIUser from '../helper/API/APIUser'
import {
  ErrorAlert,
  PreErrorAlert,
  PreSuccessAlert,
  PreWarningAlert,
  WarningAlert,
} from '../helper/DefinedAlerts'
import Navigation from '../components/Navigation'
import GlobalStyles, { KeyboardDetection } from '../styles/GlobalStyles'
import IRegisterProps from '../interfaces/IRegisterProps'
import LoginButton from './Login/LoginButton'
import LoginInput from './Login/LoginInput'
import LoginInputEmail from './Login/LoginInputEmail'
import LoginInputPassword from './Login/LoginInputPassword'
import RegisterTitle from './Login/RegisterTitle'
import IRegisterState from '../interfaces/IRegisterState'
import { RedirectIfPossible } from '../Router/react-router'
import SafeComponent from '../components/SafeComponent'

export default class Register extends SafeComponent<
  IRegisterProps,
  IRegisterState
> {
  state: IRegisterState = {
    firstName: '',
    lastName: '',
    password: '',
    passwordRepeat: '',
    redirect: '',
    keyboardHeight: 0,
    email: '',
    checking: false,
    disabled: false,
    emailValid: true,
    alert: {
      type: 'error',
      text: '',
    },
    passwordValid: undefined,
    passwordRepeatValid: undefined,
  }

  WAlert(pre: string): void {
    this.setState({
      alert: PreWarningAlert(`register.${pre}.`, 'text', 'info'),
    })
    this.ResetAlert()
  }

  ResetAlert() {
    setTimeout(
      () => this.setState({ checking: false, disabled: false }),
      1 * 1000
    )
  }

  async submit() {
    this.setState({ checking: true, disabled: true })

    const { firstName, lastName, email, password, passwordRepeat } = this.state

    const pwValid = !this.state.passwordValid || !this.state.passwordRepeatValid
    const pwMatch = password === '' || password !== passwordRepeat

    if (firstName === '') return this.WAlert('no.firstname')
    if (lastName === '') return this.WAlert('no.lastname')
    if (email === '') return this.WAlert('no.email')
    if (this.state.emailValid !== true) return this.WAlert('invalid.email')
    if (pwValid) return this.WAlert('invalid.passwords')
    if (pwMatch) return this.WAlert('unmatch.passwords')

    try {
      APIUser.register(
        firstName,
        lastName,
        email,
        password,
        passwordRepeat,
        account => {
          if (account) {
            const alert = PreSuccessAlert('register.welcome.', 'text', 'info')
            const { text } = alert

            const t = text.replace('%firstname%', firstName)
            alert.text = t
            this.setState({ alert })

            setTimeout(() => this.setState({ redirect: '/' }), 3 * 1000)
          } else this.setState({ alert: WarningAlert('register.unsuccess') })
        }
      )
    } catch (e: any) {
      if (e.message === 'Request failed with status code 406')
        this.setState({ alert: ErrorAlert('register.406') })
      else if (e.message === 'Request failed with status code 400')
        this.setState({ alert: PreErrorAlert('register.400', 'text', 'info') })
      else if (e.message === 'Request failed with status code 500')
        this.setState({ alert: PreErrorAlert('register.500', 'text', 'info') })
      else {
        console.log(e.message)
        this.setState({
          alert: {
            type: 'error',
            text: 'Error occured!',
          },
        })
      }
      this.ResetAlert()
    }
  }

  render() {
    return (
      <KeyboardDetection
        update={(keyboardHeight: any) => this.setState({ keyboardHeight })}
      >
        <RedirectIfPossible to={this.state.redirect} />
        <BackgroundImage>
          <Navigation url="/login" label="Registration" />
          {this.state.alert.text !== '' && (
            <Alert
              yOffset={GlobalStyles().statusbarHeight}
              onClose={() => {
                this.setState({ alert: { text: '', type: 'error' } })
              }}
              {...this.state.alert}
            />
          )}
          <ScrollView
            style={{
              height:
                GlobalStyles().appHeight -
                GlobalStyles().statusbarHeight -
                GlobalStyles().barHeight -
                this.state.keyboardHeight,
            }}
          >
            <RegisterTitle />
            <LoginInput
              onChange={firstName => this.setState({ firstName })}
              onSubmit={() => this.submit()}
              placeholder="Vorname"
            />
            <LoginInput
              onChange={lastName => this.setState({ lastName })}
              onSubmit={() => this.submit()}
              placeholder="Nachname"
            />
            <Text
              style={{
                marginLeft: 20,
                color: '#fff',
                opacity: 0.3,
                fontSize: 12,
                marginTop: 5,
                marginBottom: -22,
              }}
            >
              Nachname wird zu <Text style={{ fontWeight: 'bold' }}>N.</Text>{' '}
              abgek??rzt!
            </Text>
            <LoginInputEmail
              onChange={(email, emailValid) =>
                this.setState({ email, emailValid })
              }
              onSubmit={() => this.submit()}
            />
            <LoginInputPassword
              onChange={(password, passwordValid) =>
                this.setState({ password, passwordValid })
              }
              onSubmit={() => this.submit()}
            />
            <LoginInputPassword
              repeat={true}
              onChange={(passwordRepeat, passwordRepeatValid) =>
                this.setState({ passwordRepeat, passwordRepeatValid })
              }
              onSubmit={() => this.submit()}
            />
            <LoginButton
              checking={this.state.checking}
              onSubmit={() => this.submit()}
              disabled={this.state.disabled}
            />
          </ScrollView>
        </BackgroundImage>
      </KeyboardDetection>
    )
  }
}
