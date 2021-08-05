import React, { Component } from 'react'
import { View, Pressable, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import BadgeStyle from './styles/BadgeStyle'
import BarSquare from './styles/BarSquare'
import NavigationButtonIconStyle from './styles/NavigationButtonIconStyle'
import NavigationLabelStyle from './styles/NavigationLabelStyle'
import RowFlexStyle from './styles/RowFlexStyle'
import GlobalStyles from './styles/GlobalStyles'
import INavigationTitleProps from './interfaces/INavigationTitleProps'

export default class NavigationTitle extends Component<INavigationTitleProps> {
  render() {
    const barIcon = {
      onPress: this.props.onPress,
      style: BarSquare,
    }
    const icon = {
      style: NavigationButtonIconStyle,
      name: this.props.open ? 'times' : 'bars',
      size: 20,
      fill: '#fff',
    }

    return (
      <View style={RowFlexStyle}>
        <Pressable {...barIcon}>
          <Icon {...icon} />
          {this.props.badge && (
            <Text style={BadgeStyle(GlobalStyles().color.red)}>
              {this.props.badge}
            </Text>
          )}
        </Pressable>
        <Text style={NavigationLabelStyle}>{this.props.label}</Text>
      </View>
    )
  }
}
