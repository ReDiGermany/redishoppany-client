import React, { Component } from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import MoveableTextDropdownStyles from '../../styles/MoveableTextDropdownStyles'
import IMoveableTextDropdownProps from '../../interfaces/IMoveableTextDropdownProps'

export default class MoveableTextDropdown extends Component<IMoveableTextDropdownProps> {
  state = {
    selectedItem:
      this.props.selectedItem ??
      (this.props.dropdownItems.length && this.props.dropdownItems[0].value),
  }

  render() {
    return (
      <View style={MoveableTextDropdownStyles.container}>
        <Picker
          style={MoveableTextDropdownStyles.picker}
          selectedValue={this.state.selectedItem}
          onValueChange={itemValue =>
            this.setState({ selectedItem: itemValue })
          }
        >
          <Picker.Item
            style={{ color: '#fff' }}
            enabled={false}
            label="Select"
          />
          {this.props.dropdownItems.map(item => (
            <Picker.Item style={{ color: '#fff' }} key={item.value} {...item} />
          ))}
        </Picker>
      </View>
    )
  }
}
