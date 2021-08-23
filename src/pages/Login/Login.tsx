import React, { Component } from 'react'
import { View, SafeAreaView, Dimensions } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import Row from '../../components/Row'
import LoginTitle from './LoginTitle'
import LoginInputEmail from './LoginInputEmail'
import LoginInputPassword from './LoginInputPassword'
import LoginButton from './LoginButton'
import LoginHeading from './LoginHeading'
import LoginSocialButton from './LoginSocialButton'
import LoginLongButton from './LoginLongButton'
import GlobalStyles from '../../styles/GlobalStyles'
import { Redirect } from '../../Router/react-router'
import APIUser from '../../helper/API/APIUser'
import loginStyles from '../../styles/LoginStyle'
import Alert from '../../components/Alert'
import ILoginStateAlert from '../../interfaces/ILoginStateAlert'
import ILoginState from '../../interfaces/ILoginState'
import ILoginProps from '../../interfaces/ILoginProps'
import IScreen from '../../interfaces/IScreen'
import Language from '../../language/Language'
import BackgroundImage from '../../components/BackgroundImage'

export default class Login extends Component<ILoginProps, ILoginState> {
  state: ILoginState = {
    email: '',
    password: '',
    redirect: '',
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
    if (this.state.redirect !== '') return <Redirect to={this.state.redirect} />

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
        console.log('loginresult', loggedin, { email, password })
        if (loggedin) this.setState({ loggedin })
        this.setState({ loginChecking: false })
      }
    }

    if (this.state.loggedin) {
      console.log('ok')

      return <Redirect to="/" />
    }

    const { alert } = this.state

    return (
      <SafeAreaView style={loginStyles().body}>
        <BackgroundImage>
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
              <LoginSocialButton
                onUrl={_url => {}}
                url="/login/vendor/google"
                color="#34a853"
                icon="google"
              />
              <LoginSocialButton
                onUrl={_url => {}}
                url="/login/vendor/facebook"
                color="#3b5998"
                icon="facebook-f"
              />
              <LoginSocialButton
                onUrl={_url => {}}
                url="/login/vendor/twitter"
                color="#1da1f2"
                icon="twitter"
              />
              {/* <LoginSocialButton onUrl={url=>{}} url='/login/vendor/instagram' color="#e1306c" icon="instagram" /> */}
            </Row>

            <LoginHeading title={Language.get('login.noaccount')} />
            <Row>
              <LoginLongButton
                onPress={() => this.setState({ redirect: '/register' })}
                icon="user-plus"
                title={Language.get('register')}
              />
              <LoginLongButton
                onPress={async () => {
                  const result = await WebBrowser.openBrowserAsync(
                    'https://expo.dev'
                  )
                  console.log(result)
                  // setResult(result);
                }}
                icon="user-secret"
                title={Language.get('login.anonym')}
              />
            </Row>
          </View>
        </BackgroundImage>
      </SafeAreaView>
    )
  }
}
