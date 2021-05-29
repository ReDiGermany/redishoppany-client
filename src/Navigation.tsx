import React, { Component } from 'react'
import { View, Text, Pressable, Platform } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Sidebar from './components/Sidebar/Sidebar'
import NavigationBarStyle from './styles/NavigationBarStyle'
import NavigationButtonIconStyle from './styles/NavigationButtonIconStyle'
import NavigationTitle from './NavigationTitle'
import IconBoxStyle from './styles/IconBoxStyle'
import IAPIUserMe from './interfaces/IAPIUserMe'

interface INavigationProps {
  label: string
  badge?: string
  buttons?: { name: string; onClick?: () => void; icon: string }[]
  user?: IAPIUserMe
}

export default class Navigation extends Component<INavigationProps> {
  state = {
    navOpen: false,
  }

  render() {
    const navigationTitle = {
      label: this.props.label,
      badge: this.props.badge,
      open: this.state.navOpen,
      onPress: () => {
        this.setState({ navOpen: !this.state.navOpen })
      },
    }

    const sidebar = {
      onShouldClose: () => {
        this.setState({ navOpen: false })
      },
      open: this.state.navOpen,
      user: this.props.user,
    }

    const pressable = (item: any) => ({
      onPress: item.onClick,
      key: item.name,
      style: IconBoxStyle,
    })

    const buttons =
      !this.state.navOpen && this.props.buttons ? this.props.buttons : []

    let zIndex: number | undefined
    if (Platform.OS === 'web' && this.state.navOpen) {
      zIndex = 1
    }

    return (
      <View style={{ zIndex }}>
        <View style={NavigationBarStyle}>
          <NavigationTitle {...navigationTitle} />
          {buttons.map(item => (
            <Pressable {...pressable(item)}>
              <Text style={NavigationButtonIconStyle}>
                <Icon name={item.icon} size={20} />
              </Text>
            </Pressable>
          ))}
        </View>
        <Sidebar {...sidebar} />
      </View>
    )
  }
}
