import React, { Component } from 'react'
import { Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { deleteIconStyle } from '../../styles/MoveableStyle'

interface IMoveableDeleteIconProps {
  posX: number
  onPress: () => void
}

export default class MoveableDeleteIcon extends Component<IMoveableDeleteIconProps> {
  render() {
    const icon = {
      style: deleteIconStyle.icon(this.props.posX),
      name: 'trash',
    }

    return (
      <Pressable
        onPress={this.props.onPress}
        style={deleteIconStyle.box(this.props.posX)}
      >
        <Icon {...icon} />
      </Pressable>
    )
  }
}
