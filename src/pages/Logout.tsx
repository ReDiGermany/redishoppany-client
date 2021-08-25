import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import SafeComponent from '../components/SafeComponent'
import APIUser from '../helper/API/APIUser'
import IPageProps from '../interfaces/IPageProps'
import { Redirect } from '../Router/react-router'

export default class Logout extends SafeComponent<IPageProps> {
  async componentDidMount() {
    await APIUser.logout()
    await AsyncStorage.clear()
  }

  render() {
    return <Redirect to="/login" />
  }
}
