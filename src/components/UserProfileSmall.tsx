import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Link } from '../Router/react-router'
import ColumnStyle from '../styles/ColumnStyle'
import { profileStyle } from '../styles/SidebarStyle'
import IUserProfileSmall from '../styles/IUserProfileSmall'
import Row from './Row'

export default class UserProfileSmall extends Component<IUserProfileSmall> {
  render() {
    const icon = {
      style: profileStyle.bell,
      name: 'bell',
    }
    const rowStyle = {
      backgroundColor: !(this.props.solid ?? false) ? '#202020' : 'transparent',
    }

    return (
      <Row style={rowStyle}>
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
