import React, { Component } from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Language from '../../language/Language'
import loginStyles from '../../styles/LoginStyle'
import ILoginButtonProps from '../../interfaces/ILoginButtonProps'

export default class LoginButton extends Component<ILoginButtonProps> {
  render() {
    const textStyle = {
      ...loginStyles().vendorLoginText,
      ...loginStyles().loginButtonText,
    }

    let text = 'login'
    if (this.props.checking) text = 'login.checking'
    else if (this.props.disabled) text = 'login.please'

    return (
      <Pressable
        disabled={this.props.disabled}
        style={{
          ...loginStyles().loginButton,
          ...(this.props.disabled ? { opacity: 0.8 } : {}),
        }}
        onPress={this.props.onSubmit}
      >
        <Text style={textStyle}>
          {!this.props.checking && <Icon name="sign-in-alt" size={20} />}{' '}
          {Language.get(text)}
        </Text>
      </Pressable>
    )
  }
}
