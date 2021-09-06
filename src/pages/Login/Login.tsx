import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View } from 'react-native'
import * as AuthSession from 'expo-auth-session'
import Row from '../../components/Row'
import LoginTitle from './LoginTitle'
import LoginInputEmail from './LoginInputEmail'
import LoginInputPassword from './LoginInputPassword'
import LoginButton from './LoginButton'
import LoginHeading from './LoginHeading'
import LoginSocialButton from './LoginSocialButton'
import LoginLongButton from './LoginLongButton'
import GlobalStyles from '../../styles/GlobalStyles'
import { RedirectIfPossible } from '../../Router/react-router'
import APIUser from '../../helper/API/APIUser'
import Alert from '../../components/Alert'
import ILoginState from '../../interfaces/ILoginState'
import ILoginProps from '../../interfaces/ILoginProps'
// import IScreen from '../../interfaces/IScreen'
import Language from '../../language/Language'
import BackgroundImage from '../../components/BackgroundImage'
import {
  DefPreErrorAlert,
  DefPreInfoAlert,
  DefPreSuccessAlert,
  DefPreWarningAlert,
  SuccessAlert,
} from '../../helper/DefinedAlerts'
import { filterRedirectUrl } from '../../helper/Functions'
import { FB_APP_ID, GOOGLE_CLIENT_ID } from '../../helper/Constants'
import SafeComponent from '../../components/SafeComponent'

export default class Login extends SafeComponent<ILoginProps, ILoginState> {
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
  }

  loginAnonAsync = async () => {
    this.setState({ alert: DefPreInfoAlert('anon.register') })
    APIUser.registerAnon(loggedin => {
      this.setState({ loggedin })

      setTimeout(async () => {
        if (loggedin) {
          this.setState({ alert: DefPreSuccessAlert('anon.register.success') })
          this.reloadApp()
        } else {
          this.setState({ alert: DefPreErrorAlert('anon.register.fail') })
        }
      }, 3000)
    })
  }

  async setToken(email: string, token: string) {
    await AsyncStorage.setItem('email', email)
    await AsyncStorage.setItem('token', token)
  }

  handleGooglePressAsync = async () => {
    const redirectUrl = 'https://auth.expo.io/@redigermany/lisha'
    const returnUrl = AuthSession.getDefaultReturnUrl()
    const scope = encodeURIComponent(
      'openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email'
    )
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=${redirectUrl}&client_id=${GOOGLE_CLIENT_ID}`
    const result = await AuthSession.startAsync({ authUrl, returnUrl })
    if ('url' in result && result.errorCode === null) {
      const token = filterRedirectUrl(result.url)
      try {
        this.setState({
          alert: DefPreInfoAlert('login.facebook.check'),
        })
        APIUser.checkGoogleToken(token, tokenResult => {
          setTimeout(async () => {
            if (typeof tokenResult === 'boolean') {
              DefPreWarningAlert('login.facebook.error.email')
            } else {
              this.setState({
                alert: DefPreSuccessAlert('login.facebook.success'),
                loggedin: true,
              })
              const { email, token: t1 } = tokenResult
              await this.setToken(email, t1)
              this.reloadApp()
            }
          }, 2000)
        })
      } catch (e: any) {
        console.log(e.message)
        DefPreWarningAlert('login.facebook.error')
      }
    }
  }

  handleFacebookPressAsync = async () => {
    try {
      const redirectUrl = 'https://auth.expo.io/@redigermany/lisha' // AuthSession.getRedirectUrl()
      const authUrl = `https://www.facebook.com/v2.8/dialog/oauth?response_type=token&client_id=${FB_APP_ID}&scope=email&redirect_uri=${redirectUrl}`
      const result = await AuthSession.startAsync({ authUrl })
      if ('url' in result && result.errorCode === null) {
        const token = filterRedirectUrl(result.url)
        if (token !== null) {
          try {
            this.setState({
              alert: DefPreInfoAlert('login.facebook.check'),
            })
            APIUser.checkFacebookToken(token, tokenResult => {
              setTimeout(async () => {
                if (typeof tokenResult === 'boolean') {
                  DefPreWarningAlert('login.facebook.error.email')
                } else {
                  this.setState({
                    alert: DefPreSuccessAlert('login.facebook.success'),
                    loggedin: true,
                  })
                  const { email, token: t1 } = tokenResult
                  await this.setToken(email, t1)
                  this.reloadApp()
                }
              }, 2000)
            })
          } catch (E) {
            DefPreWarningAlert('login.facebook.error')
          }
        } else DefPreWarningAlert('login.facebook.error')
      } else DefPreWarningAlert('login.facebook.error')
    } catch (e: any) {
      console.log(e.message)
      DefPreWarningAlert('login.facebook.error')
    }
  }

  handleEmailPasswordLoginAsync = async () => {
    if (this.state.passwordValid && this.state.emailValid) {
      const { email, password } = this.state
      this.setState({ loginChecking: true })

      APIUser.checkLogin(email, password, loggedin => {
        if (loggedin) {
          const alert = SuccessAlert('login.welcome')
          this.setState({ loggedin, alert, loginChecking: false })
          this.reloadApp()
        } else {
          const alert = DefPreErrorAlert('login.wrong.credentials')
          this.setState({ alert, loginChecking: false })
        }
      })
    }
  }

  reloadApp() {
    this.props.onReloadMe()
  }

  startLoginAnonAsync() {
    this.setState({ redirect: '/login/anon' })
  }

  render() {
    let boxHeight = 30 + 20 // welcome text + subline text
    boxHeight += 2 * (GlobalStyles().barHeight + 30) // input fields
    boxHeight += GlobalStyles().barHeight + 30 // login btn
    boxHeight += 40 // heading
    boxHeight += GlobalStyles().barHeight // socialmedia login
    boxHeight += 40 // heading
    boxHeight += GlobalStyles().lineHeight // register / anonym

    return (
      <BackgroundImage>
        <RedirectIfPossible to={this.state.redirect} />
        {this.state.alert.text !== '' && (
          <Alert
            onClose={async () => {
              this.setState({ alert: { text: '', type: 'success' } })
              if (this.state.loggedin) {
                this.setState({ redirect: '/' })
                console.log('done?')
              }
            }}
            {...this.state.alert}
          />
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
            onSubmit={this.handleEmailPasswordLoginAsync}
            onChange={(email, emailValid) =>
              this.setState({ email, emailValid })
            }
          />
          <LoginInputPassword
            onSubmit={this.handleEmailPasswordLoginAsync}
            onChange={(password, passwordValid) =>
              this.setState({ password, passwordValid })
            }
          />
          <LoginButton
            checking={this.state.loginChecking}
            onSubmit={this.handleEmailPasswordLoginAsync}
            disabled={!(this.state.passwordValid && this.state.emailValid)}
          />

          <LoginHeading title={Language.get('login.via')} />
          <Row>
            <LoginSocialButton
              onPress={this.handleGooglePressAsync}
              color="#34a853"
              icon="google"
            />
            <LoginSocialButton
              onPress={this.handleFacebookPressAsync}
              color="#3b5998"
              icon="facebook-f"
            />
          </Row>

          <LoginHeading title={Language.get('login.noaccount')} />
          <Row>
            <LoginLongButton
              onPress={() => this.setState({ redirect: '/register' })}
              icon="user-plus"
              title={Language.get('register')}
            />
            <LoginLongButton
              onPress={() => this.startLoginAnonAsync()}
              icon="user-secret"
              title={Language.get('login.anonym')}
            />
          </Row>
        </View>
      </BackgroundImage>
    )
  }
}
