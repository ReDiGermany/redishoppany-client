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
import EditRecipe from './pages/EditRecipe/EditRecipe'

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
    this.setState({ user })
  }

  render() {
    return (
      <AppearanceProvider>
        <StatusBar style="auto" />
        <View
          style={{ height: GlobalStyles.appHeight, backgroundColor: '#202020' }}
        >
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
                <Route
                  path="/list/:id"
                  render={(props: any) => (
                    <List user={this.state.user} id={props.match.params.id} />
                  )}
                ></Route>
                <Route path="/settings">
                  <Settings user={this.state.user} />
                </Route>
                <Route path="/notifications">
                  <Notifications user={this.state.user} />
                </Route>
                <Route path="/recipes">
                  <Recipes user={this.state.user} />
                </Route>
                <Route path="/recipe/add">
                  <EditRecipe user={this.state.user} />
                </Route>
                <Route
                  path="/recipe/:id"
                  render={(props: any) => (
                    <Recipe user={this.state.user} id={props.match.params.id} />
                  )}
                />
                <Route path="/logout">
                  <Logout user={this.state.user} />
                </Route>
                <Route exact path="/">
                  {/* TODO: Add default list id? */}
                  <List user={this.state.user} id={1} />
                </Route>
              </View>
            </Router>
          </View>
        </View>
      </AppearanceProvider>
    )
  }
}
