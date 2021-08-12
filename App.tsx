import React, { Component } from 'react'
import { AppearanceProvider } from 'react-native-appearance'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Index from './src/Index'
import APIUser from './src/helper/API/APIUser'
import Language from './src/language/Language'
import { Router } from './src/Router/react-router'
import MainWindowStyles from './src/styles/MainWindowStyles'

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
        <View style={MainWindowStyles.container}>
          <Router>
            <Index {...this.state} />
          </Router>
        </View>
      </AppearanceProvider>
    )
  }
}
