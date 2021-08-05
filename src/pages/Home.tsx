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

  render() {
    return (
      <View style={{ backgroundColor: '#111' }}>
        <View
          style={{
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            overflow: 'hidden',
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
          navUpdate={active => {
            this.setState({ active })
          }}
        />
      </View>
    )
  }
}
