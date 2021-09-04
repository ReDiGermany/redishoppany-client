import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { View } from 'react-native'
import BackgroundImage from '../components/BackgroundImage'
import BottomNavigation from '../components/BottomNavigation'
import SafeComponent from '../components/SafeComponent'
import IPageProps from '../interfaces/IPageProps'
import HomeStyles from '../styles/HomeStyles'
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
    if (active === null) active = '0'
    await AsyncStorage.setItem('activeHomePage', active)
    this.setState({ active: parseInt(active, 10) })
  }

  render() {
    const { active } = this.state

    const data = {
      onReload: () => this.props.onReload?.(),
      user: this.props.user,
      connected: this.props.connected,
    }

    return (
      <View style={HomeStyles.outerView}>
        <View style={{ ...HomeStyles.innerView, ...HomeStyles.shadow }}>
          <View style={{ ...HomeStyles.innerView, overflow: 'hidden' }}>
            <BackgroundImage>
              {active === 0 && <HomeList {...data} />}
              {active === 1 && <HomeFoodplan {...data} />}
              {active === 2 && <HomeRecipes {...data} />}
              {active === 3 && <HomeFriendlist {...data} />}
            </BackgroundImage>
          </View>
        </View>
        <BottomNavigation
          active={active}
          navUpdate={act => this.setState({ active: act })}
        />
      </View>
    )
  }
}
