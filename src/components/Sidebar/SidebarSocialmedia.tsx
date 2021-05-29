import React, { Component } from 'react'
import { View } from 'react-native'
import SidebarSocialmediaIcon from './SidebarSocialmediaIcon'

export default class SidebarSocialmedia extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 10,
        }}
      >
        <SidebarSocialmediaIcon
          name="facebook-f"
          color="#3b5998"
          to="https://facebook.com/ReDiGermany"
        />
        <SidebarSocialmediaIcon
          name="instagram"
          color="#e1306c"
          to="https://instagram.com/ReDiGermany"
        />
        <SidebarSocialmediaIcon
          name="twitter"
          color="#1da1f2"
          to="https://twitter.com/ReDiGermany"
        />
        <SidebarSocialmediaIcon
          name="discord"
          color="#7289da"
          to="https://twitter.com/ReDiGermany"
        />
      </View>
    )
  }
}
