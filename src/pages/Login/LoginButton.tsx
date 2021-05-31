import React, { Component } from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import loginStyles from '../../styles/LoginStyle'

interface ILoginButtonProps {
  disabled: boolean
  checking: boolean
  onSubmit: () => void
}

export default class LoginButton extends Component<ILoginButtonProps> {
  render() {
    const textStyle = [loginStyles.vendorLoginText, loginStyles.loginButtonText]

    return (
      <Pressable
        disabled={this.props.disabled}
        style={[
          loginStyles.loginButton,
          this.props.disabled ? { opacity: 0.8 } : {},
        ]}
        onPress={this.props.onSubmit}
      >
        {this.props.checking ? (
          <Text style={textStyle}>Checking login...</Text>
        ) : (
          <Text style={textStyle}>
            <Icon name="sign-in-alt" size={20} />{' '}
            {this.props.disabled ? 'please login...' : 'Login'}
          </Text>
        )}
      </Pressable>
    )
  }
}
