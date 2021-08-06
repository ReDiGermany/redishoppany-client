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
import WebStyle from './helper/WebStyle'

export default class NavigationTitle extends Component<INavigationTitleProps> {
  render() {
    const barIcon = {
      onPress: this.props.onPress,
      style: BarSquare,
    }
    const icon = {
      style: NavigationButtonIconStyle,
      name: 'arrow-left',
      size: 20,
      fill: '#fff',
    }

    return (
      <View style={RowFlexStyle}>
        {!(this.props.simple ?? false) && (
          <Pressable {...barIcon}>
            <Icon {...icon} />
            {this.props.badge && (
              <Text style={BadgeStyle(GlobalStyles().color.red)}>
                {this.props.badge}
              </Text>
            )}
          </Pressable>
        )}
        <Text
          style={{
            ...NavigationLabelStyle,
            ...(this.props.subTitle !== undefined
              ? {
                  ...WebStyle({ lineHeight: GlobalStyles().barHeight - 20 }),
                  height: 50,
                }
              : {}),
          }}
        >
          {this.props.label}
        </Text>
        {this.props.subTitle !== undefined ? (
          <Text
            style={{
              color: '#fff',
              position: 'absolute',
              bottom: 10,
              left: 15,
              fontSize: 10,
              opacity: 0.5,
            }}
          >
            {this.props.subTitle}
          </Text>
        ) : (
          <></>
        )}
      </View>
    )
  }
}
