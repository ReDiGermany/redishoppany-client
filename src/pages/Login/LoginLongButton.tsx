import React, { Component } from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import loginStyles from '../../styles/LoginStyle'

interface ILoginSocialButtonProps {
  title: string
  icon?: string
}

export default class LoginLongButton extends Component<ILoginSocialButtonProps> {
  render() {
    return (
      <Pressable style={[loginStyles().longButton]} onPress={() => {}}>
        <Text style={loginStyles().vendorLoginText}>
          {this.props.icon && (
            <Icon
              style={[
                loginStyles().vendorLoginIcon,
                loginStyles().LongButtonIcon,
              ]}
              name={this.props.icon}
            />
          )}{' '}
          {this.props.title}
        </Text>
      </Pressable>
    )
  }
}
