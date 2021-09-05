import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text, Pressable } from 'react-native'
import INavigationPropsButton from '../interfaces/INavigationPropsButton'
import IconBoxStyle from '../styles/IconBoxStyle'
import { badge } from '../styles/NavigationBarStyle'
import NavigationButtonIconStyle from '../styles/NavigationButtonIconStyle'
import SafeComponent from './SafeComponent'

export default class NavigationButton extends SafeComponent<{
  item: INavigationPropsButton
}> {
  render() {
    return (
      <Pressable
        onPress={() => this.props.item.onClick?.()}
        key={this.props.item.name}
        style={IconBoxStyle}
      >
        {this.props.item.badge && (
          <Text style={badge(this.props.item.badge.color)}>
            {this.props.item.badge.text}
          </Text>
        )}
        <Text style={NavigationButtonIconStyle}>
          <Icon name={this.props.item.icon} size={15} />
        </Text>
      </Pressable>
    )
  }
}
