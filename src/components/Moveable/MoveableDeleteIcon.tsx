import React, { Component } from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { deleteIconStyle } from '../../styles/MoveableStyle'

interface IMoveableDeleteIconProps {
  posX: number
}

export default class MoveableDeleteIcon extends Component<IMoveableDeleteIconProps> {
  render() {
    const icon = {
      style: deleteIconStyle.icon(this.props.posX),
      name: 'trash',
    }
    // console.log(icon)

    return (
      <View style={deleteIconStyle.box(this.props.posX)}>
        <Icon {...icon} />
      </View>
    )
  }
}
