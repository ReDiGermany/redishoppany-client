import React, { Component } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Index from './src/Index'
import SplashScreen from './src/SplashScreen'
import Login from './src/pages/Login/Login'
import APIUser from './src/helper/API/APIUser'
import Language from './src/language/Language'

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
    if (!this.state.checkMeDone) return <SplashScreen />
    if (!this.state.loggedin) return <Login />

    return <Index />
  }
}
