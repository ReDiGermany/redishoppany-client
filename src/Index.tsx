import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'
import { View, StatusBar as sb } from 'react-native'
import { AppearanceProvider } from 'react-native-appearance'
import { Router, Route } from './Router/react-router'
import About from './pages/About'
import Foodplan from './pages/Foodplan'
import Friends from './pages/Friends'
import Imprint from './pages/Imprint'
import List from './pages/List'
import Settings from './pages/Settings'
import Recipes from './pages/Recipes'
import Notifications from './pages/Notifications'
import GlobalStyles from './styles/GlobalStyles'
import Recipe from './pages/Recipe/Recipe'
import Logout from './pages/Logout'
import IAPIUserMe from './interfaces/IAPIUserMe'
import APIUser from './helper/API/APIUser'

interface IIndexProps {}
interface IIndexState {
  user?: IAPIUserMe
}

export default class Index extends Component<IIndexProps, IIndexState> {
  state = {
    user: undefined,
  }

  async componentDidMount() {
    const user = await APIUser.getMe()
    console.log('user', user)
    this.setState({ user })
  }

  render() {
    return (
      <AppearanceProvider>
        <StatusBar style="auto" />
        <View
          style={{ height: GlobalStyles.appHeight, backgroundColor: '#202020' }}
        >
          <StatusBar style="auto" />
          <View
            style={{
              marginTop: sb.currentHeight ?? 0,
              height: GlobalStyles.appHeight,
            }}
          >
            <Router>
              <View>
                <Route path="/about">
                  <About user={this.state.user} />
                </Route>
                <Route path="/foodplan">
                  <Foodplan user={this.state.user} />
                </Route>
                <Route path="/friends">
                  <Friends user={this.state.user} />
                </Route>
                <Route path="/imprint">
                  <Imprint user={this.state.user} />
                </Route>
                <Route path="/list">
                  <List user={this.state.user} />
                </Route>
                <Route path="/settings">
                  <Settings user={this.state.user} />
                </Route>
                <Route path="/notifications">
                  <Notifications user={this.state.user} />
                </Route>
                <Route path="/recipes">
                  <Recipes user={this.state.user} />
                </Route>
                <Route path="/recipe/:id">
                  <Recipe user={this.state.user} />
                </Route>
                <Route path="/logout">
                  <Logout user={this.state.user} />
                </Route>
                <Route exact path="/">
                  <List user={this.state.user} />
                </Route>
              </View>
            </Router>
          </View>
        </View>
        {/* <ShoppingItem name="Item 1" /> */}
        {/* <ShoppingItem name="Item 2" /> */}
        {/* <ShoppingItem name="Item 3" /> */}
        {/* <ShoppingItem name="Item 4" /> */}
        {/* <ShoppingItem name="Item 5" /> */}
        {/* <ShoppingItem name="Item 6" /> */}
        {/* <ShoppingItem name="Item 7" /> */}
        {/* <ShoppingItem name="Item 8" /> */}
        {/* <ShoppingItem name="Item 9" /> */}
        {/* <ShoppingItem name="Item 10" /> */}
      </AppearanceProvider>
    )
  }
}
