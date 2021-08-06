import React, { Component } from 'react'
import { TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import IAddBarProps from '../interfaces/IAddBarProps'
import Row from './Row'
import AddBarStyles from '../styles/AddBarStyles'

export default class AddBar extends Component<IAddBarProps> {
  state = {
    value: '',
  }

  render() {
    if (!this.props.visible) return <></>

    const textInput: any = {
      autoFocus: true,
      placeholder: this.props.placeholder,
      placeholderTextColor: '#ffffff30',
      autoCapitalize: 'none',
      onSubmitEditing: () => this.props.onChange(this.state.value),
      style: AddBarStyles.input,
      onChangeText: (value: string) => this.setState({ value }),
    }

    if (this.props.type === 'email') {
      textInput.textContentType = 'emailAddress'
      textInput.keyboardType = 'email-address'
      textInput.autoCompleteType = 'off'
    }

    const icon = {
      onPress: () => this.props.onChange(this.state.value),
      style: AddBarStyles.icon,
      name: this.props.icon ?? 'check',
    }

    return (
      <Row>
        <TextInput {...textInput} />
        <Icon {...icon} />
      </Row>
    )
  }
}
