import React, { Component } from 'react'
import { Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Language from '../language/Language'
import BottomNavigationStyle from '../styles/BottomNavigationStyle'
import { IBottomNavigationProps } from '../interfaces/IBottomNavigationProps'
import Row from './Row'

export default class BottomNavigation extends Component<IBottomNavigationProps> {
  state = {
    active: 0,
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

  render() {
    return (
      <Row style={BottomNavigationStyle.row}>
        {this.state.items.map((item, index) => (
          <Pressable
            key={item.name}
            style={{
              ...BottomNavigationStyle.button,
              ...(this.state.active === index
                ? BottomNavigationStyle.activeButton
                : {}),
            }}
            onPress={() => {
              this.props.navUpdate(index)
              this.setState({ active: index })
            }}
          >
            <Icon
              style={{
                ...BottomNavigationStyle.icon,
                ...(this.state.active === index
                  ? BottomNavigationStyle.activeIcon
                  : {}),
              }}
              name={item.icon}
            />
            <Text
              style={{
                ...BottomNavigationStyle.text,
                ...(this.state.active === index
                  ? BottomNavigationStyle.activeText
                  : {}),
              }}
            >
              {item.name}
            </Text>
          </Pressable>
        ))}
      </Row>
    )
  }
}
