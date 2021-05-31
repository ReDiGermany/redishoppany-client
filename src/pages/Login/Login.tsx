import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import Row from '../../components/Row'
import LoginTitle from './LoginTitle'
import LoginInputEmail from './LoginInputEmail'
import LoginInputPassword from './LoginInputPassword'
import LoginButton from './LoginButton'
import LoginHeading from './LoginHeading'
import LoginSocialButton from './LoginSocialButton'
import LoginLongButton from './LoginLongButton'
import GlobalStyles from '../../styles/GlobalStyles'
import { Router } from '../../Router/react-router'
import Index from '../../Index'
import APIUser from '../../helper/API/APIUser'
import loginStyles from '../../styles/LoginStyle'

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    emailValid: null,
    passwordValid: null,
    loggedin: false,
  }

  render() {
    let boxHeight = 30 // welcome text
    boxHeight += 2 * (GlobalStyles.barHeight + 30) // input fields
    boxHeight += GlobalStyles.barHeight + 30 // login btn
    boxHeight += 40 // heading
    boxHeight += GlobalStyles.barHeight // socialmedia login
    boxHeight += 40 // heading
    boxHeight += GlobalStyles.lineHeight // register / anonym

    const checkLogin = async () => {
      if (this.state.passwordValid && this.state.emailValid) {
        const { email, password } = this.state

        const loggedin = await APIUser.checkLogin(email, password)
        this.setState({ loggedin })
      }
    }

    if (this.state.loggedin) {
      return <Index />
    }

    return (
      <Router>
        <SafeAreaView style={loginStyles.body}>
          <View
            style={{
              maxWidth: 500,
              height: boxHeight,
              marginTop: (GlobalStyles.appHeight - boxHeight) / 2,
            }}
          >
            <LoginTitle />
            <LoginInputEmail
              onSubmit={checkLogin}
              onChange={(email, emailValid) => {
                this.setState({ email, emailValid })
              }}
            />
            <LoginInputPassword
              onSubmit={checkLogin}
              onChange={(password, passwordValid) => {
                this.setState({ password, passwordValid })
              }}
            />
            <LoginButton
              onSubmit={checkLogin}
              disabled={!(this.state.passwordValid && this.state.emailValid)}
            />

            <LoginHeading title="or login via" />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
              }}
            >
              <LoginSocialButton color="#34a853" icon="google" />
              <LoginSocialButton color="#3b5998" icon="facebook-f" />
              <LoginSocialButton color="#1da1f2" icon="twitter" />
              {/* <LoginSocialButton color="#e1306c" icon="instagram" /> */}
            </View>

            <LoginHeading title="kein Account?" />
            <Row>
              <LoginLongButton icon="user-plus" title="Registrieren" />
              <LoginLongButton icon="user-secret" title="anonym nutzen" />
            </Row>
          </View>
        </SafeAreaView>
      </Router>
    )
  }
}
