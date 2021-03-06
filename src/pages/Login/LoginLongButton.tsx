import React from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import loginStyles from '../../styles/LoginStyle'
import ILoginLongButtonProps from '../../interfaces/ILoginLongButtonProps'
import SafeComponent from '../../components/SafeComponent'

export default class LoginLongButton extends SafeComponent<ILoginLongButtonProps> {
  render() {
    return (
      <Pressable style={loginStyles().longButton} onPress={this.props.onPress}>
        <Text style={loginStyles().vendorLoginText}>
          {this.props.icon && (
            <Icon
              style={{
                ...loginStyles().vendorLoginIcon,
                ...loginStyles().LongButtonIcon,
              }}
              name={this.props.icon}
            />
          )}{' '}
          {this.props.title}
        </Text>
      </Pressable>
    )
  }
}
