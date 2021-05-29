import React, { Component } from 'react'
import { Linking, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { socialMediaStyle } from '../../styles/SidebarStyle'

interface ISidebarSocialmediaIconProps {
  to: string
  name: string
  color: string
}

export default class SidebarSocialmediaIcon extends Component<ISidebarSocialmediaIconProps> {
  render() {
    const open = () => {
      Linking.canOpenURL(this.props.to).then(supported => {
        if (supported) {
          Linking.openURL(this.props.to)
        } else {
          console.log(`Don't know how to open URI: ${this.props.to}`)
        }
      })
    }

    return (
      <Pressable onPress={open}>
        <Icon
          style={socialMediaStyle(this.props.color)}
          name={this.props.name}
        />
      </Pressable>
    )
  }
}
