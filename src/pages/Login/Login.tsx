import React, { Component } from 'react'
import { View, SafeAreaView } from 'react-native'
import * as Linking from 'expo-linking'
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
import { Redirect } from '../../Router/react-router'
import APIUser from '../../helper/API/APIUser'
import loginStyles from '../../styles/LoginStyle'
import Alert from '../../components/Alert'
import ILoginStateAlert from '../../interfaces/ILoginStateAlert'
import ILoginState from '../../interfaces/ILoginState'
import ILoginProps from '../../interfaces/ILoginProps'
// import IScreen from '../../interfaces/IScreen'
import Language from '../../language/Language'
import BackgroundImage from '../../components/BackgroundImage'
import { PreInfoAlert, PreWarningAlert } from '../../helper/DefinedAlerts'
import { filterFacebookRedirectUrl } from '../../helper/Functions'
import { FB_APP_ID } from '../../helper/Constants'

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
  }

  PreWarningAlert(pre: string) {
    this.setState({
      alert: PreWarningAlert(pre, 'text', 'info'),
    })
  }

  handleFacebookPressAsync = async () => {
    try {
      const redirectUrl = 'https://auth.expo.io/@redigermany/lisha' // AuthSession.getRedirectUrl()
      const authUrl = `https://www.facebook.com/v2.8/dialog/oauth?response_type=token&client_id=${FB_APP_ID}&scope=email&redirect_uri=${redirectUrl}`
      const result = await AuthSession.startAsync({ authUrl })
      if ('url' in result && result.errorCode === null) {
        const token = filterFacebookRedirectUrl(result.url)
        if (token !== null) {
          try {
            this.setState({
              alert: PreInfoAlert('login.facebook.check.', 'text', 'info'),
            })
            const tokenResult = await APIUser.checkFacebookToken(token)
            setTimeout(() => {
              if (typeof tokenResult === 'boolean') {
                this.PreWarningAlert('login.facebook.error.email.')
              } else {
                console.log(tokenResult)
              }
            }, 2000)
          } catch (E) {
            this.PreWarningAlert('login.facebook.error.')
          }
        } else this.PreWarningAlert('login.facebook.error.')
      } else this.PreWarningAlert('login.facebook.error.')
    } catch (e) {
      console.log(e.message)
      this.PreWarningAlert('login.facebook.error.')
    }
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

        const loggedin = await APIUser.checkLogin(email, password)

        if (loggedin) {
          const alert: ILoginStateAlert = {
            type: 'success',
            text: 'Willkommen!',
          }
          this.setState({ loggedin, alert, loginChecking: false })
        } else {
          const alert: ILoginStateAlert = {
            type: 'error',
            text: 'Logindaten waren falsch!',
            info: 'Bitte versuche es erneut.',
          }
          this.setState({ alert, loginChecking: false })
        }
      }
    }

    if (this.state.loggedin) return <Redirect to="/" />

    const { alert } = this.state

    return (
      <SafeAreaView style={loginStyles().body}>
        <BackgroundImage>
          {!this.state.loginChecking && this.state.alert.text !== '' && (
            <Alert
              onClose={() =>
                this.setState({ alert: { text: '', type: 'success' } })
              }
              {...alert}
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
                onPress={this.handleFacebookPressAsync}
                // onUrl={handleFacebookPressAsync}
                url="/login/vendor/facebook"
                color="#3b5998"
                icon="facebook-f"
              />
              <LoginSocialButton
                onUrl={_url => {
                  Linking.openSettings()
                }}
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
                onPress={() => {}}
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
