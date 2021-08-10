import React, { Component } from 'react'
import { Dimensions, TextInput } from 'react-native'
import IScreen from '../../interfaces/IScreen'
import loginStyles from '../../styles/LoginStyle'
import { ILoginInputEmailProps } from '../../interfaces/ILoginInputEmailProps'

export default class LoginInputEmail extends Component<ILoginInputEmailProps> {
  state = {
    valid: undefined,
    value: '',
    dimensions: {
      window: undefined,
      screen: undefined,
    },
  }

  onChange = (dimensions: { window: IScreen; screen: IScreen }) => {
    console.log('LoginInputEmail', dimensions)
    this.setState({ dimensions })
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.onChange)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener('change', this.onChange)
  }

  render() {
    let style: 'unknown' | 'valid' | 'invalid' = 'unknown'
    if (this.state.valid !== undefined) {
      style = this.state.valid ? 'valid' : 'invalid'
    }

    return (
      <TextInput
        placeholderTextColor="rgba(255,255,255,.5)"
        style={[loginStyles().input, loginStyles()[style]]}
        onSubmitEditing={this.props.onSubmit}
        onChangeText={value => {
          const valid =
            value === ''
              ? undefined
              : value.match(
                  /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z0-9_.-]{2,4})$/
                ) !== null
          this.setState({ value, valid })
          this.props.onChange(value, valid)
        }}
        placeholder="E-Mail"
        keyboardType="email-address"
      />
    )
  }
}
