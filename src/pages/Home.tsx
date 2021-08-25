import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View, StyleSheet } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import BottomNavigation from '../components/BottomNavigation'
import SafeComponent from '../components/SafeComponent'
import IPageProps from '../interfaces/IPageProps'
import GlobalStyles from '../styles/GlobalStyles'
import HomeFoodplan from './Home/HomeFoodplan'
import HomeFriendlist from './Home/HomeFriendlist'
import HomeList from './Home/HomeLists'
import HomeRecipes from './Home/HomeRecipes'

export default class Home extends SafeComponent<IPageProps> {
  state = {
    active: 0,
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
    const { active } = this.state

    const styles = StyleSheet.create({
      outerView: { backgroundColor: '#111' },
      innerView: {
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,

        height: GlobalStyles().contentHeight - GlobalStyles().lineHeight,
      },
    })

    return (
      <View style={styles.outerView}>
        <View
          style={{
            ...styles.innerView,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 6,
            },
            shadowOpacity: 0.37,
            shadowRadius: 7.49,

            elevation: 12,
          }}
        >
          <View style={{ ...styles.innerView, overflow: 'hidden' }}>
            <BackgroundImage>
              {active === 0 && <HomeList user={this.props.user} />}
              {active === 1 && <HomeFoodplan user={this.props.user} />}
              {active === 2 && <HomeRecipes user={this.props.user} />}
              {active === 3 && <HomeFriendlist user={this.props.user} />}
            </BackgroundImage>
          </View>
        </View>
        <BottomNavigation
          active={active}
          navUpdate={async act => {
            this.setState({ active: act })
            await AsyncStorage.setItem('activeHomePage', active.toString())
          }}
        />
      </View>
    )
  }
}
