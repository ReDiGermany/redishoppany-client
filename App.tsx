import React, { Component } from 'react'
import { AppearanceProvider } from 'react-native-appearance'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
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
    const token = (await AsyncStorage.getItem('redishoppany-token')) ?? ''
    const email = (await AsyncStorage.getItem('redishoppany-email')) ?? ''
    if (token !== '' && email !== '') {
      const me = await APIUser.getMeByToken(token, email)
      if (typeof me === 'boolean')
        this.setState({ checkMeDone: true, loggedin: false })
      else this.setState({ checkMeDone: true, loggedin: me !== undefined })
    } else this.setState({ checkMeDone: true, loggedin: false })
  }

  render() {
    return (
      <AppearanceProvider>
        <SafeAreaView>
          <StatusBar style="light" />
          <View style={MainWindowStyles.container}>
            <Router>
              <Index {...this.state} />
            </Router>
          </View>
        </SafeAreaView>
      </AppearanceProvider>
    )
  }
}
