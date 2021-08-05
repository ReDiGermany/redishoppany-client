import React, { Component } from 'react'
import { Pressable, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Language from '../language/Language'
import Row from './Row'

const bottomNavigationStyle = StyleSheet.create({
  row: {
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    height: 50,
    lineHeight: 50,
  },
  button: {
    backgroundColor: 'transparent',
    width: 60,
    height: 45,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  icon: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    marginTop: 15,
  },
  text: {
    color: 'transparent',
    fontSize: 10,
    textAlign: 'center',
  },
  activeButton: {
    backgroundColor: '#202020',
  },
  activeIcon: {
    marginTop: 10,
    fontSize: 15,
  },
  activeText: {
    color: '#ffffff33',
  },
})

interface IBottomNavigationProps {
  navUpdate: (index: number) => void
}

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
      <Row style={bottomNavigationStyle.row}>
        {this.state.items.map((item, index) => (
          <Pressable
            key={item.name}
            style={{
              ...bottomNavigationStyle.button,
              ...(this.state.active === index
                ? bottomNavigationStyle.activeButton
                : {}),
            }}
            onPress={() => {
              this.props.navUpdate(index)
              this.setState({ active: index })
            }}
          >
            <Icon
              style={{
                ...bottomNavigationStyle.icon,
                ...(this.state.active === index
                  ? bottomNavigationStyle.activeIcon
                  : {}),
              }}
              name={item.icon}
            />
            <Text
              style={{
                ...bottomNavigationStyle.text,
                ...(this.state.active === index
                  ? bottomNavigationStyle.activeText
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
