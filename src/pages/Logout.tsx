import React, { Component } from 'react'
import APIUser from '../helper/API/APIUser'
import IPageProps from '../interfaces/IPageProps'
import { Redirect } from '../Router/react-router'

export default class Logout extends Component<IPageProps> {
  async componentDidMount() {
    await APIUser.logout()
  }

  render() {
    return <Redirect to="/login" />
  }
}
