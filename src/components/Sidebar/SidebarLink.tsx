import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Link } from 'react-router-native'
import RowFlexStyle from '../../styles/RowFlexStyle'
import { linkStyle } from '../../styles/SidebarStyle'
import Row from '../Row'

interface ISidebarLinkProps {
  to: string
  name: string
  badge?: number
  shared?: boolean
}

export default class SidebarLink extends Component<ISidebarLinkProps> {
  render() {
    return (
      <View>
        <Link to={this.props.to}>
          <Row>
            <View style={RowFlexStyle}>
              <Text style={linkStyle.text}>{this.props.name}</Text>
            </View>
            {this.props.badge && this.props.badge > 0 ? (
              <Text style={linkStyle.badge}>{this.props.badge}</Text>
            ) : (
              <Text></Text>
            )}
            {this.props.shared && <Text style={linkStyle.shared}>shared</Text>}
          </Row>
        </Link>
      </View>
    )
  }
}
