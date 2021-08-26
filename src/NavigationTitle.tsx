import React from 'react'
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
import NavigationTitleStyle from './styles/NavigationTitleStyle'
import SafeComponent from './components/SafeComponent'

export default class NavigationTitle extends SafeComponent<INavigationTitleProps> {
  render() {
    const barIcon = {
      onPress: this.props.onPress,
      style: BarSquare,
    }
    const icon = {
      style: NavigationButtonIconStyle,
      name: 'arrow-left',
      size: 15,
      fill: '#fff',
    }

    const textStyle = {
      ...NavigationLabelStyle,
      ...(this.props.subTitle !== undefined && {
        ...WebStyle({ lineHeight: GlobalStyles().barHeight - 20 }),
        height: 50,
      }),
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
        <Text style={textStyle}>{this.props.label}</Text>
        {this.props.subTitle !== undefined && (
          <Text
            style={{
              ...NavigationTitleStyle,
              ...(!(this.props.simple ?? false) && {
                marginLeft: GlobalStyles().barHeight,
              }),
            }}
          >
            {this.props.subTitle}
          </Text>
        )}
      </View>
    )
  }
}
