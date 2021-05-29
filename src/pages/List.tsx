import React, { Component } from 'react'
import IPageProps from '../interfaces/IPageProps'
import MainList from './MainList'

export default class List extends Component<IPageProps> {
  render() {
    return <MainList user={this.props.user} />
  }
}
