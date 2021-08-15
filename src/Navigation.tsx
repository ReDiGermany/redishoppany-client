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
      ...this.props,
      onPress: () => this.setState({ back: true }),
    }

    const pressable = (item: any) => ({
      onPress: item.onClick,
      key: item.name,
      style: IconBoxStyle,
    })

    const ContainerStyle = {
      ...NavigationBarStyle.container,
      ...(this.props.solid ?? true ? {} : { backgroundColor: '#202020' }),
    }

    const bS = (item: any) => ({
      ...NavigationBarStyle.badge,
      backgroundColor: item.badge.color,
    })

    return (
      <View>
        <View style={ContainerStyle}>
          <NavigationTitle {...navigationTitle} />
          {this.props.buttons?.map(item => (
            <Pressable {...pressable(item)}>
              {item.badge && <Text style={bS(item)}>{item.badge.text}</Text>}
              <Text style={NavigationButtonIconStyle}>
                <Icon name={item.icon} size={15} />
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    )
  }
}
