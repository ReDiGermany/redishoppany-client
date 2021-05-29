import React, { Component } from 'react'
import { View, Dimensions, SafeAreaView, StyleSheet } from 'react-native'
import Row from '../../components/Row'
import LoginTitle from './LoginTitle'
import LoginInputEmail from './LoginInputEmail'
import LoginInputPassword from './LoginInputPassword'
import LoginButton from './LoginButton'
import LoginHeading from './LoginHeading'
import LoginSocialButton from './LoginSocialButton'
import LoginLongButton from './LoginLongButton'
import WebStyle from '../../helper/WebStyle'
import GlobalStyles from '../../styles/GlobalStyles'
import { Router } from '../../Router/react-router'
import Index from '../../Index'
import APIUser from '../../helper/API/APIUser'

const height = Dimensions.get('window').height + GlobalStyles.statusbarHeight

const loginStyles = StyleSheet.create({
  body: {
    paddingTop: GlobalStyles.statusbarHeight,
    height,
    backgroundColor: '#202020',
  },
  input: {
    textAlign: 'center',
    borderColor: 'rgba(0,0,0,.3)',
    borderWidth: 1,
    backgroundColor: '#111',
    minHeight: GlobalStyles.barHeight,
    width: 'calc( 100% - 40px )',
    marginLeft: 20,
    borderRadius: 10,
    marginTop: 30,
    color: '#fff',
  },
  vendorLogin: {
    height: GlobalStyles.lineHeight,
    // marginLeft: 20,
    borderRadius: 10,
    marginTop: 10,
    flex: 1,
    ...WebStyle({ cursor: 'pointer' }),
    marginHorizontal: 20,
  },
  longButton: {
    height: GlobalStyles.lineHeight / 2,
    width: 'calc( ( 100% / 2 ) - 25px )',
    marginLeft: 20,
    marginTop: 10,
    ...WebStyle({ cursor: 'pointer' }),
  },
  vendorLoginIcon: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 20,
    color: '#fff',
    // width: width / 4 - 25,
    height: GlobalStyles.lineHeight,
    ...WebStyle({ lineHeight: GlobalStyles.lineHeight }),
  },
  LongButtonIcon: {
    width: GlobalStyles.lineHeight / 2,
    height: GlobalStyles.lineHeight / 2,
    ...WebStyle({ lineHeight: GlobalStyles.lineHeight / 2 }),
    fontSize: 15,
  },
  valid: {
    borderColor: '#0f0',
  },
  invalid: {
    borderColor: '#f00',
  },
  unknown: {},
  loginButton: {
    ...WebStyle({ cursor: 'pointer' }),
    borderColor: '#111',
    borderWidth: 1,
    height: GlobalStyles.barHeight,
    width: 'calc( 100% - 40px )',
    left: 20,
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 30,
    backgroundColor: GlobalStyles.color.accent,
  },
  vendorLoginText: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
  },
  loginButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    ...WebStyle({ lineHeight: GlobalStyles.barHeight }),
  },
})

export { loginStyles }

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
              marginTop: `calc( (100vh - ${boxHeight}px) / 2 )`,
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
