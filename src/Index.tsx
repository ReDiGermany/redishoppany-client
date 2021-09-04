import React from 'react'
import { View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import { Route, Redirect } from './Router/react-router'
import About from './pages/About'
import Imprint from './pages/Imprint'
import List from './pages/List'
import Settings from './pages/Settings'
import Notifications from './pages/Notifications'
import Recipe from './pages/Recipe'
import Logout from './pages/Logout'
import APIUser from './helper/API/APIUser'
import EditRecipe from './pages/EditRecipe/EditRecipe'
import Home from './pages/Home'
import AddToFoodplan from './pages/AddToFoodplan'
import IIndexProps from './interfaces/IIndexProps'
import IIndexState from './interfaces/IIndexState'
import Login from './pages/Login/Login'
import SplashScreen from './SplashScreen'
import UpdateCat from './pages/UpdateCat'
import Register from './pages/Register'
import SafeComponent from './components/SafeComponent'
import Reload from './pages/Reload'
import Backgrounds from './pages/Backgrounds'
import LoginAnon from './pages/Login/LoginAnon'
import NotConnected from './pages/NotConnected'

export default class Index extends SafeComponent<IIndexProps, IIndexState> {
  state: IIndexState = {
    connected: undefined,
    user: undefined,
    checkMeDone: this.props.checkMeDone,
    loggedin: this.props.loggedin,
  }

  async reloadMe(updateAll: boolean) {
    const token = (await AsyncStorage.getItem('redishoppany-token')) ?? ''
    const email = (await AsyncStorage.getItem('redishoppany-email')) ?? ''
    console.log({ token, email })
    if (token !== '' && email !== '') {
      const user = await APIUser.getMe()
      console.log({ user })
      if (typeof user === 'boolean') {
        console.log('[index.tsx] error logging in. Wrong credentials?')
        if (updateAll) this.setState({ checkMeDone: true, loggedin: false })
      } else {
        this.setState({ user, checkMeDone: true, loggedin: true })
      }
    } else if (updateAll) this.setState({ checkMeDone: true, loggedin: false })
  }

  unsubscribe: any = null

  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        connected: state.isConnected ?? false,
      })
    })
    await this.reloadMe(true)
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    if (!this.state.checkMeDone) return <SplashScreen />

    const { user } = this.state

    return (
      <View>
        <Route
          path="/reload"
          render={() => <Reload onReload={async () => this.reloadMe(false)} />}
        />
        <Route path="/notconnected" render={() => <NotConnected />} />
        <Route path="/backgrounds" render={() => <Backgrounds />} />
        <Route path="/about" render={() => <About user={user} />} />
        <Route path="/register" render={() => <Register />} />
        <Route
          path="/foodplan/add"
          render={() => <AddToFoodplan user={user} />}
        />
        <Route path="/imprint" render={() => <Imprint user={user} />} />
        <Route
          path="/list/:id"
          render={(props: any) => (
            <List user={user} id={props.match.params.id} />
          )}
        />
        <Route path="/settings" render={() => <Settings user={user} />} />
        <Route
          path="/notifications"
          render={() => <Notifications user={user} />}
        />
        <Route path="/recipe/add" render={() => <EditRecipe user={user} />} />
        <Route
          path="/recipe/edit/:id"
          render={props => (
            <EditRecipe user={user} id={props.match.params.id} />
          )}
        />
        <Route
          path="/recipe/:id"
          render={(props: any) => (
            <Recipe user={user} id={props.match.params.id} />
          )}
        />
        <Route path="/logout" render={() => <Logout user={user} />} />
        <Route
          path="/login"
          render={() => <Login onReloadMe={() => this.reloadMe(false)} />}
        />
        <Route
          path="/login/anon"
          render={() => <LoginAnon onReloadMe={() => this.reloadMe(false)} />}
        />
        <Route
          path="/updatecat/:id"
          render={(props: any) => <UpdateCat id={props.match.params.id} />}
        />
        <Route
          exact
          path="/"
          render={() =>
            this.state.loggedin ? (
              <Home
                connected={this.state.connected}
                onReload={async () => this.reloadMe(false)}
                user={user}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
        {/* <Settings user={this.state.user} /> */}
      </View>
    )
  }
}
