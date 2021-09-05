import React from 'react'
import { Text } from 'react-native'
import SafeComponent from '../../components/SafeComponent'
import APIUser from '../../helper/API/APIUser'
import {
  DefAlert,
  DefPreErrorAlert,
  DefPreInfoAlert,
  DefPreSuccessAlert,
} from '../../helper/DefinedAlerts'
import Navigation from '../../components/Navigation'
import Moveable from '../../components/Moveable/Moveable'
import GlobalStyles from '../../styles/GlobalStyles'
import { RedirectIfPossible } from '../../Router/react-router'
import Alert from '../../components/Alert'
import Language from '../../language/Language'

interface ILoginAnonProps {
  onReloadMe: () => void
}

export default class LoginAnon extends SafeComponent<ILoginAnonProps> {
  state = {
    redirect: '',
    alert: DefAlert,
    loggedin: false,
  }

  reloadApp() {
    this.props.onReloadMe()
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

  render() {
    return (
      <>
        <RedirectIfPossible to={this.state.redirect} />
        {this.state.alert.text !== '' && (
          <Alert
            onClose={() => {
              this.setState({ alert: DefAlert })

              if (this.state.loggedin) {
                this.setState({ redirect: '/' })
                console.log('done?')
              }
            }}
            {...this.state.alert}
          />
        )}
        <Navigation url="/" label="Anonym nutzen" />
        <Text
          style={{
            color: '#ffffff80',
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
        >
          {Language.get('anon.disclaimer')}
        </Text>
        <Moveable
          onClick={async () => {
            // this.setState({ alert: DefPreInfoAlert('anon.register') })
            this.loginAnonAsync()
          }}
          icon="user-secret"
          large={true}
          name="Anonym Einloggen"
        />
        <Moveable
          icon="arrow-left"
          bgColor={GlobalStyles().color.accent}
          large={true}
          name="Zurück"
          onClick={() => this.setState({ redirect: '/' })}
        />
      </>
    )
  }
}
