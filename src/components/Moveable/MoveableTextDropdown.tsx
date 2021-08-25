import React from 'react'
import { View } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import MoveableTextDropdownStyles from '../../styles/MoveableTextDropdownStyles'
import IMoveableTextDropdownProps from '../../interfaces/IMoveableTextDropdownProps'
import SafeComponent from '../SafeComponent'

export default class MoveableTextDropdown extends SafeComponent<IMoveableTextDropdownProps> {
  state = {
    selectedItem:
      this.props.selectedItem ??
      (this.props.dropdownItems.length && this.props.dropdownItems[0].value),
  }

  render() {
    const picker = {
      style: MoveableTextDropdownStyles.picker,
      selectedValue: this.state.selectedItem,
      onValueChange: (itemValue: any) =>
        this.setState({ selectedItem: itemValue }),
    }

    return (
      <View style={MoveableTextDropdownStyles.container}>
        <Picker {...picker}>
          {this.props.dropdownItems.map(item => (
            <Picker.Item style={{ color: '#fff' }} key={item.value} {...item} />
          ))}
        </Picker>
      </View>
    )
  }
}
