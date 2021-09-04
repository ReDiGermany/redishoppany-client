import React from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import loginStyles from '../../styles/LoginStyle'
import ILoginSocialButtonProps from '../../interfaces/ILoginSocialButtonProps'
import SafeComponent from '../../components/SafeComponent'

export default class LoginSocialButton extends SafeComponent<ILoginSocialButtonProps> {
  state = {
    pressed: false,
    icon: this.props.icon,
  }

  render() {
    return (
      <Pressable
        style={{
          ...loginStyles().vendorLogin,
          backgroundColor: this.props.color,
        }}
        onPress={() => {
          this.setState({ icon: 'hourglass', pressed: true })
          setTimeout(() => {
            this.props.onPress?.()
            this.setState({ icon: 'check', pressed: false })
            setTimeout(() => {
              this.setState({ icon: this.props.icon })
            }, 1000)
          }, 1000)
        }}
      >
        <Icon style={loginStyles().vendorLoginIcon} name={this.state.icon} />
      </Pressable>
    )
  }
}
