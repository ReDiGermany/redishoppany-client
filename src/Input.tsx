import React, { Component } from 'react'
import { Pressable, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import {
  box,
  button,
  icon,
  prefixBlock,
  textBlock,
  textBlockNoPrefix,
} from './styles/InputStyle'

interface IInputProps {
  onSave: (_text: string, _amount: string) => void
  onChange?: (_text: string, _amount: string) => void
  prefix?: any
  textPlaceholder?: string
  amountPlaceholder?: string
}

export default class Input extends Component<IInputProps> {
  state = {
    amount: this.props.prefix.toString() ?? '',
    text: '',
    focus: false,
  }

  render() {
    const onSubmit = () => {
      this.props.onSave(this.state.text, this.state.amount)
      this.setState({
        amount: this.props.prefix.toString() ?? '',
        text: '',
        focus: true,
      })
    }
    const onChange = (data: any) => {
      this.setState(data)
      this.props.onChange?.(this.state.text, this.state.amount)
    }

    return (
      <View style={box}>
        {this.props.prefix && (
          <TextInput
            value={this.state.amount}
            onSubmitEditing={onSubmit}
            onChange={e => onChange({ amount: e.nativeEvent.text })}
            style={prefixBlock}
            placeholder={this.props.amountPlaceholder ?? 'Num'}
          />
        )}
        <TextInput
          value={this.state.text}
          onSubmitEditing={onSubmit}
          onChange={e => onChange({ text: e.nativeEvent.text })}
          style={[textBlock, !this.props.prefix && textBlockNoPrefix]}
          autoFocus={this.state.focus}
          placeholder={this.props.textPlaceholder ?? 'Text'}
          placeholderTextColor={'#ffffff80'}
        />
        <Pressable onPress={onSubmit} style={button}>
          <Icon style={icon} name="check" />
        </Pressable>
      </View>
    )
  }
}
