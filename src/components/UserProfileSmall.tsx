import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IPageProps from '../interfaces/IPageProps'
import { Link } from '../Router/react-router'
import ColumnStyle from '../styles/ColumnStyle'
import { profileStyle } from '../styles/SidebarStyle'
import Row from './Row'

export default class UserProfileSmall extends Component<IPageProps> {
  render() {
    const icon = {
      style: profileStyle.bell,
      name: 'bell',
    }

    return (
      <Row style={{}}>
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
        {(this.props.user?.notificationCount ?? 0) > 0 && (
          <Link style={profileStyle.bellLink} to="/notifications">
            <>
              <Icon solid={true} {...icon} />
              <Text style={profileStyle.bellNumber}>
                {this.props.user?.notificationCount}
              </Text>
            </>
          </Link>
        )}
      </Row>
    )
  }
}
