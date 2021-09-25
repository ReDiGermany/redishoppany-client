import React from 'react'
import NetInfo from '@react-native-community/netinfo'
import * as Constants from 'expo-constants'
import { AppState } from 'react-native'
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
import Socket from './helper/Socket'
import Alert from './components/Alert'
import { DefAlert } from './helper/DefinedAlerts'

export default class Index extends SafeComponent<IIndexProps, IIndexState> {
  state: IIndexState = {
    connected: undefined,
    user: undefined,
    checkMeDone: this.props.checkMeDone,
    loggedin: this.props.loggedin,
    appState: AppState.currentState,
    alert: DefAlert,
  }

  async reloadMe(updateAll: boolean) {
    console.log('index reloadMe', Constants.default.deviceName)
    APIUser.getMe(user => {
      if (typeof user === 'boolean') {
        console.log('[index.tsx] error logging in. Wrong credentials?')
        if (updateAll) this.setState({ checkMeDone: true, loggedin: false })
      } else {
        this.setState({ user, checkMeDone: true, loggedin: true })
      }
    })
  }

  unsubscribe: any = null

  appStateSubscription: any = null

  async componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      const connected = state.isConnected ?? false
      this.setState({ connected })
    })
    // Socket.open()
    this.appStateSubscription = AppState.addEventListener(
      'change',
      nextAppState => {
        const wasInactive =
          (this.state.appState.match(/inactive|background/) ?? []).length >= 0
        const isActive = nextAppState === 'active'
        if (wasInactive && isActive) {
          Socket.open({
            onAlert: alert => {
              this.setState({
                alert: {
                  type: alert.type,
                  text: alert.text,
                  info: alert.info !== '' ? alert.info : undefined,
                },
              })
            },
          }).onConnect(() => this.reloadMe(true))
        } else Socket.close(2)
        this.setState({ appState: nextAppState })
      }
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
    this.appStateSubscription?.remove()
    Socket.close(1)
  }

  render() {
    if (!this.state.checkMeDone) return <SplashScreen />

    return (
      <>
        {this.state.alert.text !== '' && (
          <Alert
            onClose={() => this.setState({ alert: DefAlert })}
            {...this.state.alert}
          />
        )}
        <Route path="/reload">
          <Reload onReload={async () => this.reloadMe(false)} />
        </Route>
        <Route path="/notconnected">
          <NotConnected />
        </Route>
        <Route path="/backgrounds">
          <Backgrounds />
        </Route>
        <Route path="/about">
          <About user={this.state.user} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/foodplan/add">
          <AddToFoodplan user={this.state.user} />
        </Route>
        <Route path="/imprint">
          <Imprint user={this.state.user} />
        </Route>
        <Route path="/settings">
          <Settings user={this.state.user} />
        </Route>
        <Route path="/notifications">
          <Notifications user={this.state.user} />
        </Route>
        <Route path="/recipe/add">
          <EditRecipe user={this.state.user} />
        </Route>
        <Route path="/logout">
          <Logout user={this.state.user} />
        </Route>
        <Route path="/login">
          <Login onReloadMe={() => this.reloadMe(false)} />
        </Route>
        <Route path="/login/anon">
          <LoginAnon onReloadMe={() => this.reloadMe(false)} />
        </Route>
        <Route
          path="/list/:id"
          render={(props: any) => (
            <List user={this.state.user} id={props.match.params.id} />
          )}
        ></Route>
        <Route
          path="/recipe/edit/:id"
          render={props => (
            <EditRecipe user={this.state.user} id={props.match.params.id} />
          )}
        />
        <Route
          path="/recipe/:id"
          render={(props: any) => (
            <Recipe user={this.state.user} id={props.match.params.id} />
          )}
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
                user={this.state.user}
              />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </>
    )
  }
}
