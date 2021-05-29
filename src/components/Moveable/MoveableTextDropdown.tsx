import React, { Component } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'

interface IMoveableTextDropdownProps {
  dropdownItems: { label: string; value: string }[]
  dropdownSelected: (_item: { label: string; value: string }) => void
}

export default class MoveableTextDropdown extends Component<IMoveableTextDropdownProps> {
  state = {
    selectedItem: this.props.dropdownItems[0].value,
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(255,255,255,.2)',
          borderRadius: 5,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Picker
          style={{
            backgroundColor: '#202020',
            borderRadius: 5,
            borderColor: '#202020',
            color: '#fff',
            flex: 1,
          }}
          selectedValue={this.state.selectedItem}
          onValueChange={itemValue =>
            this.setState({ selectedItem: itemValue })
          }
        >
          {this.props.dropdownItems.map(item => (
            <Picker.Item style={{ color: '#fff' }} key={item.value} {...item} />
          ))}
        </Picker>
      </View>
    )
  }
}
