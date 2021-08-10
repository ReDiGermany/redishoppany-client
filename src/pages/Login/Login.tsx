import React, { Component } from 'react'
import { View, SafeAreaView, Dimensions, ImageBackground } from 'react-native'
import Row from '../../components/Row'
import LoginTitle from './LoginTitle'
import LoginInputEmail from './LoginInputEmail'
import LoginInputPassword from './LoginInputPassword'
import LoginButton from './LoginButton'
import LoginHeading from './LoginHeading'
import LoginSocialButton from './LoginSocialButton'
import LoginLongButton from './LoginLongButton'
import GlobalStyles from '../../styles/GlobalStyles'
import { Redirect, Router } from '../../Router/react-router'
import APIUser from '../../helper/API/APIUser'
import loginStyles from '../../styles/LoginStyle'
import Alert from '../../components/Alert'
import ILoginStateAlert from '../../interfaces/ILoginStateAlert'
import ILoginState from '../../interfaces/ILoginState'
import ILoginProps from '../../interfaces/ILoginProps'
import IScreen from '../../interfaces/IScreen'
import Language from '../../language/Language'

export default class Login extends Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    email: '',
    password: '',
    emailValid: undefined,
    passwordValid: undefined,
    loggedin: false,
    loginChecking: false,
    alert: {
      type: 'error',
      text: '',
      info: undefined,
    },
    dimensions: {
      window: undefined,
      screen: undefined,
    },
  }

  onChange = (dimensions: { window: IScreen; screen: IScreen }) => {
    this.setState({ dimensions })
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange)
  }

  render() {
    let boxHeight = 30 + 20 // welcome text + subline text
    boxHeight += 2 * (GlobalStyles().barHeight + 30) // input fields
    boxHeight += GlobalStyles().barHeight + 30 // login btn
    boxHeight += 40 // heading
    boxHeight += GlobalStyles().barHeight // socialmedia login
    boxHeight += 40 // heading
    boxHeight += GlobalStyles().lineHeight // register / anonym

    const checkLogin = async () => {
      if (this.state.passwordValid && this.state.emailValid) {
        const { email, password } = this.state
        this.setState({ loginChecking: true })

        const loggedin = await APIUser.checkLogin(email, password).catch(() => {
          const alert: ILoginStateAlert = {
            type: 'error',
            text: 'Logindaten waren falsch!',
            info: 'Bitte versuche es erneut.',
          }
          this.setState({ alert })
        })
        if (loggedin) this.setState({ loggedin })
        this.setState({ loginChecking: false })
      }
    }

    if (this.state.loggedin) {
      return <Redirect to="/" />
    }

    const { alert } = this.state

    return (
      <Router>
        <SafeAreaView style={loginStyles().body}>
          <ImageBackground
            source={require('../../../assets/background.jpg')}
            resizeMode="cover"
            style={{ width: GlobalStyles().appWidth }}
          >
            {!this.state.loginChecking && this.state.alert.text !== '' && (
              <Alert {...alert} />
            )}
            <View
              style={{
                maxWidth: 500,
                height: boxHeight,
                marginTop: (GlobalStyles().appHeight - boxHeight) / 2,
              }}
            >
              <LoginTitle />
              <LoginInputEmail
                onSubmit={checkLogin}
                onChange={(email, emailValid) =>
                  this.setState({ email, emailValid })
                }
              />
              <LoginInputPassword
                onSubmit={checkLogin}
                onChange={(password, passwordValid) =>
                  this.setState({ password, passwordValid })
                }
              />
              <LoginButton
                checking={this.state.loginChecking}
                onSubmit={checkLogin}
                disabled={!(this.state.passwordValid && this.state.emailValid)}
              />

              <LoginHeading title={Language.get('login.via')} />
              <Row>
                <LoginSocialButton color="#34a853" icon="google" />
                <LoginSocialButton color="#3b5998" icon="facebook-f" />
                <LoginSocialButton color="#1da1f2" icon="twitter" />
                {/* <LoginSocialButton color="#e1306c" icon="instagram" /> */}
              </Row>

              <LoginHeading title={Language.get('login.noaccount')} />
              <Row>
                <LoginLongButton
                  onPress={() => {}}
                  icon="user-plus"
                  title={Language.get('register')}
                />
                <LoginLongButton
                  onPress={() => {}}
                  icon="user-secret"
                  title={Language.get('login.anonym')}
                />
              </Row>
            </View>
          </ImageBackground>
        </SafeAreaView>
      </Router>
    )
  }
}
