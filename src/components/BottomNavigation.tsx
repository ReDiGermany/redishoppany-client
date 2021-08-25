import React from 'react'
import { Pressable, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
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
      {
        name: Language.get('overview'),
        icon: 'home',
      },

      {
        name: Language.get('foodlist'),
        icon: 'bars',
      },

      {
        name: Language.get('recipes'),
        icon: 'book',
      },

      {
        name: Language.get('friends'),
        icon: 'users',
      },
    ],
  }

  async componentDidMount() {
    let active: string | null = await AsyncStorage.getItem('activeHomePage')
    if (active === null) {
      active = '0'
      await AsyncStorage.setItem('activeHomePage', active)
    }
    this.setState({ active: parseInt(active, 10) })
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
              this.props.navUpdate(index)
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
              <Text style={textStyle}>{item.name.toString()}</Text>
            </Pressable>
          )
        })}
      </Row>
    )
  }
}
