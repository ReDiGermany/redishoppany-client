import React, { Component } from 'react'
import IPageProps from '../interfaces/IPageProps'

export default class MainList extends Component<IPageProps> {
  render() {
    return <MainList user={this.props.user} />
  }
}
