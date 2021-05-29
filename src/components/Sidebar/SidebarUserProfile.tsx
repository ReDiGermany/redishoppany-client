import React, { Component } from 'react'
import { View, Text } from 'react-native'
import IPageProps from '../../interfaces/IPageProps'
import ColumnStyle from '../../styles/ColumnStyle'
import { profileStyle } from '../../styles/SidebarStyle'
import Row from '../Row'

export default class SidebarUserProfile extends Component<IPageProps> {
  render() {
    return (
      <Row>
        <View style={profileStyle.image}></View>
        <View style={ColumnStyle}>
          <Text style={profileStyle.name}>
            {this.props.user?.profile.firstName}{' '}
            {this.props.user?.profile.lastName}
          </Text>
          <Text style={profileStyle.email}>
            {this.props.user?.profile.email}
          </Text>
        </View>
      </Row>
    )
  }
}
