import React, { Component } from 'react'
import { View, Text, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationBarStyle from './styles/NavigationBarStyle'
import NavigationButtonIconStyle from './styles/NavigationButtonIconStyle'
import NavigationTitle from './NavigationTitle'
import IconBoxStyle from './styles/IconBoxStyle'
import INavigationProps from './interfaces/INavigationProps'
import { Redirect } from './Router/react-router'

export default class Navigation extends Component<INavigationProps> {
  state = {
    back: false,
  }

  render() {
    if (this.state.back) return <Redirect to="/" />

    const navigationTitle = {
      label: this.props.label,
      badge: this.props.badge,
      simple: this.props.simple,
      onPress: () => this.setState({ back: true }),
    }

    const pressable = (item: any) => ({
      onPress: item.onClick,
      key: item.name,
      style: IconBoxStyle,
    })

    return (
      <View>
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
