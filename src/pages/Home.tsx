import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import { View, ImageBackground } from 'react-native'
import BottomNavigation from '../components/BottomNavigation'
import IPageProps from '../interfaces/IPageProps'
import GlobalStyles from '../styles/GlobalStyles'
import HomeFoodplan from './Home/HomeFoodplan'
import HomeFriendlist from './Home/HomeFriendlist'
import HomeList from './Home/HomeLists'
import HomeRecipes from './Home/HomeRecipes'

export default class Home extends Component<IPageProps> {
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
    return (
      <View style={{ backgroundColor: '#111' }}>
        <View
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            overflow: 'hidden',
            height: GlobalStyles().contentHeight,
          }}
        >
          <ImageBackground
            source={require('../../assets/background.jpg')}
            resizeMode="cover"
            style={{ width: GlobalStyles().appWidth }}
          >
            {this.state.active === 0 && <HomeList user={this.props.user} />}
            {this.state.active === 1 && <HomeFoodplan user={this.props.user} />}
            {this.state.active === 2 && <HomeRecipes user={this.props.user} />}
            {this.state.active === 3 && (
              <HomeFriendlist user={this.props.user} />
            )}
          </ImageBackground>
        </View>
        <BottomNavigation
          active={this.state.active}
          navUpdate={async active => {
            this.setState({ active })
            await AsyncStorage.setItem('activeHomePage', active.toString())
          }}
        />
      </View>
    )
  }
}
