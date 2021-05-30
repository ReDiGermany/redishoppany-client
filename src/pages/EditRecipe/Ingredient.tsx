import React, { Component } from 'react'
import { TextInput, View } from 'react-native'
import GlobalStyles from '../../styles/GlobalStyles'

interface IIngredientProps {
  name?: string
  amount?: string
  index?: number
  focus: boolean
  onChange?: (_name: string, _amount: string, _index?: number) => void
  onSubmit?: () => void
}

export default class Ingredient extends Component<IIngredientProps> {
  state = {
    name: this.props.name ?? '',
    amount: this.props.amount ?? '',
  }

  render() {
    const onSubmit = () => {
      this.props.onSubmit?.()
    }
    const onChange = (type: any) => {
      this.setState(type)
      this.props.onChange?.(
        this.state.name,
        this.state.amount,
        this.props.index
      )
    }

    return (
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <TextInput
          style={{
            color: '#fff',
            backgroundColor: '#111',
            padding: 10,
            marginTop: 10,
            width: 50,
            marginRight: 2,
          }}
          value={this.props.amount}
          onSubmitEditing={onSubmit}
          onChange={d => onChange({ amount: d.nativeEvent.text })}
          placeholder="Num"
        />
        <TextInput
          autoFocus={this.props.focus}
          value={this.props.name}
          style={{
            color: '#fff',
            backgroundColor: '#111',
            padding: 10,
            marginTop: 10,
            width: GlobalStyles.appWidth / 2 - 72,
          }}
          onSubmitEditing={onSubmit}
          onChange={d => onChange({ name: d.nativeEvent.text })}
          placeholder="Name"
        />
      </View>
    )
  }
}
