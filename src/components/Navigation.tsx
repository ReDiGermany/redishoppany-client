import React from 'react'
import { View, Text, Pressable, BackHandler } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import NavigationBarStyle from '../styles/NavigationBarStyle'
import NavigationButtonIconStyle from '../styles/NavigationButtonIconStyle'
import NavigationTitle from './NavigationTitle'
import IconBoxStyle from '../styles/IconBoxStyle'
import INavigationProps from '../interfaces/INavigationProps'
import { RedirectIfPossible } from '../Router/react-router'
import SafeComponent from './SafeComponent'

export default class Navigation extends SafeComponent<INavigationProps> {
  state = {
    redirect: '',
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.backHandler())
  }

  backHandler() {
    if (!this.props.simple) {
      this.setState({ redirect: this.props.url ?? '/' })

      return true
    }

    return false
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () =>
      this.backHandler()
    )
  }

  render() {
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
        <RedirectIfPossible to={this.state.redirect} />
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
