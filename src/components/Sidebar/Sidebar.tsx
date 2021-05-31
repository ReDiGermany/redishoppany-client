import React, { Component } from 'react'
import {
  Dimensions,
  View,
  Animated,
  SafeAreaView,
  ScrollView,
  Pressable,
} from 'react-native'
import SidebarHeading from './SidebarHeading'
import SidebarLine from './SidebarLine'
import SidebarLink from './SidebarLink'
import SidebarSocialmedia from './SidebarSocialmedia'
import SidebarUserProfile from './SidebarUserProfile'
import GlobalStyles from '../../styles/GlobalStyles'
import { boxStyle } from '../../styles/SidebarStyle'
import IAPIUserMe from '../../interfaces/IAPIUserMe'

interface ISidebarProps {
  open: boolean
  onShouldClose: () => void
  user?: IAPIUserMe
}

export default class Sidebar extends Component<ISidebarProps> {
  state = {
    fadeAnim: new Animated.Value(0),
    fadeVal: 0,
    windowHeight: Dimensions.get('window').height,
  }

  componentDidMount() {
    this.state.fadeAnim.addListener(({ value: fadeVal }) => {
      this.setState({ fadeVal })
    })
  }

  componentDidUpdate(prevProps: ISidebarProps) {
    if (prevProps.open !== this.props.open) {
      Animated.timing(this.state.fadeAnim, {
        toValue: this.props.open ? 1 : 0,
        duration: 100,
        useNativeDriver: true,
      }).start()
    }
  }

  render() {
    const sidebarBox = {
      style: boxStyle.outerBox(this.props.open, this.state.fadeVal),
      onTouchStart: this.props.onShouldClose,
    }
    const sidebarContainer = {
      onTouchStart: (e: any) => {
        e.stopPropagation()
      },
      style: boxStyle.box(this.state.fadeVal),
    }

    return (
      <Animated.View {...sidebarBox}>
        <Pressable
          style={{ height: '100%', width: '100%' }}
          onPress={this.props.onShouldClose}
        >
          <View {...sidebarContainer}>
            <View style={{ flex: 1 }}>
              <SidebarUserProfile user={this.props.user} />
              <SafeAreaView
                style={{
                  height: GlobalStyles().contentHeight - 60 - 80,
                }}
              >
                <ScrollView>
                  {this.props.user?.lists.map(list => (
                    <View key={list.ownerName}>
                      <SidebarHeading name={`${list.ownerName}'s Listen`} />
                      {list.items.map(item => (
                        <SidebarLink
                          key={`${list.ownerName}-${item.name}`}
                          to={`/list/${item.id}`}
                          name={item.name}
                          badge={item.count}
                          // shared={true}
                        />
                      ))}
                    </View>
                  ))}
                  <SidebarLine />
                  <SidebarLink
                    to="/notifications"
                    name="Benachrichtigungen"
                    badge={this.props.user?.notificationCount}
                  />
                  <SidebarLine />
                  <SidebarLink
                    to="/recipes"
                    name="Rezepte"
                    badge={this.props.user?.recipeCount}
                  />
                  <SidebarLink
                    to="/foodplan"
                    name="Essensplan"
                    badge={this.props.user?.foodplanCount}
                  />
                  <SidebarLink to="/friends" name="Freunde" />
                  <SidebarLink to="/settings" name="Einstellungen" />
                  <SidebarLine />
                  <SidebarLink to="/about" name="Über ReDiShoppany" />
                  <SidebarLink to="/imprint" name="Impressum" />
                </ScrollView>
              </SafeAreaView>
            </View>
            <SidebarSocialmedia />
          </View>
        </Pressable>
      </Animated.View>
    )
  }
}
