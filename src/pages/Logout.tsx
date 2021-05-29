import React, { Component } from 'react'
import APIUser from '../helper/API/APIUser'
import IPageProps from '../interfaces/IPageProps'
import Login from './Login/Login'

export default class Logout extends Component<IPageProps> {
  async componentDidMount() {
    await APIUser.logout()
  }

  render() {
    return <Login />
  }
}
