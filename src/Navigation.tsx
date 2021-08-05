import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationBarStyle from './styles/NavigationBarStyle'
import NavigationButtonIconStyle from './styles/NavigationButtonIconStyle'
import NavigationTitle from './NavigationTitle'
import IconBoxStyle from './styles/IconBoxStyle'
import INavigationProps from './interfaces/INavigationProps'

export default class Navigation extends Component<INavigationProps> {
  state = {}

  render() {
    const navigationTitle = {
      label: this.props.label,
      badge: this.props.badge,
      onPress: () => {
        console.log('back?')
      },
    }

    const pressable = (item: any) => ({
      onPress: item.onClick,
      key: item.name,
      style: IconBoxStyle,
    })

    let zIndex: number | undefined

    return (
      <View style={{ zIndex }}>
        <View style={NavigationBarStyle}>
          <NavigationTitle {...navigationTitle} />
          {this.props.buttons?.map(item => (
            <Pressable {...pressable(item)}>
              <Text style={NavigationButtonIconStyle}>
                <Icon name={item.icon} size={20} />
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    )
  }
}
