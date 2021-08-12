import React, { Component } from 'react'
import { AppearanceProvider } from 'react-native-appearance'
import { StatusBar } from 'expo-status-bar'
import { View, StatusBar as sb } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Index from './src/Index'
import APIUser from './src/helper/API/APIUser'
import Language from './src/language/Language'
import GlobalStyles from './src/styles/GlobalStyles'
import { Router } from './src/Router/react-router'

export default class App extends Component {
  state = {
    checkMeDone: false,
    loggedin: false,
  }

  constructor(props: any) {
    super(props)

    Language.getInstance().init('de')
  }

  async componentDidMount() {
    try {
      const token = (await AsyncStorage.getItem('redishoppany-token')) ?? ''
      const email = (await AsyncStorage.getItem('redishoppany-email')) ?? ''
      const me = await APIUser.getMeByToken(token, email)
      this.setState({ checkMeDone: true, loggedin: me !== undefined })
    } catch (error) {
      this.setState({ checkMeDone: true, loggedin: false })
    }
  }

  render() {
    return (
      <AppearanceProvider>
        <StatusBar style="auto" />
        <View
          style={{
            height: GlobalStyles().appHeight,
            backgroundColor: '#202020',
          }}
        >
          <View
            style={{
              marginTop: sb.currentHeight ?? 0,
              height: GlobalStyles().appHeight,
            }}
          >
            <Router>
              <Index {...this.state} />
            </Router>
          </View>
        </View>
      </AppearanceProvider>
    )
  }
}
