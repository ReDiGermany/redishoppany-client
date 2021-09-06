import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Language from '../language/Language'
import BottomNavigationStyle from '../styles/BottomNavigationStyle'
import IBottomNavigationProps from '../interfaces/IBottomNavigationProps'
import Row from './Row'
import SafeComponent from './SafeComponent'

export default class BottomNavigation extends SafeComponent<IBottomNavigationProps> {
  state = {
    active: this.props.active,
    items: [
      { name: 'overview', icon: 'home' },
      { name: 'foodlist', icon: 'bars' },
      { name: 'recipes', icon: 'book' },
      { name: 'friends', icon: 'users' },
    ],
  }

  async componentDidMount() {
    const active = (await AsyncStorage.getItem('homepane')) ?? '0'
    this.setState({ active: parseInt(active, 10) })
  }

  async navUpdate(index: number) {
    await AsyncStorage.setItem('homepane', index.toString())
    this.props.navUpdate(index)
  }

  render() {
    return (
      <Row style={BottomNavigationStyle.row}>
        {this.state.items.map((item, index) => {
          const active = this.state.active === index

          const pressable = {
            key: item.name.toString(),
            style: {
              ...BottomNavigationStyle.button,
              ...(active && BottomNavigationStyle.activeButton),
            },
            onPress: () => {
              this.navUpdate(index)
              this.setState({ active: index })
            },
          }

          const icon = {
            style: {
              ...BottomNavigationStyle.icon,
              ...(active && BottomNavigationStyle.activeIcon),
            },
            name: item.icon,
          }

          const textStyle = {
            ...BottomNavigationStyle.text,
            ...(active && BottomNavigationStyle.activeText),
          }

          return (
            <Pressable {...pressable}>
              <Icon {...icon} />
              <Text style={textStyle}>{Language.get(item.name)}</Text>
            </Pressable>
          )
        })}
      </Row>
    )
  }
}
