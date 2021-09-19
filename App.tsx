import React, { Component } from 'react'
import * as Localization from 'expo-localization'
import { AppearanceProvider } from 'react-native-appearance'
import { StatusBar } from 'expo-status-bar'
import { Platform, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Notifications from 'expo-notifications'
import Index from './src/Index'
import APIUser from './src/helper/API/APIUser'
import Language from './src/language/Language'
import { Router } from './src/Router/react-router'
import MainWindowStyles from './src/styles/MainWindowStyles'
import Socket from './src/helper/Socket'

const registerForPushNotificationsAsync = async () => {
  let token = ''
  // if (Constants.isDevice) {
  const { status: existingStatus } = await Notifications.getPermissionsAsync()
  let finalStatus = existingStatus
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync()
    finalStatus = status
  }
  if (finalStatus !== 'granted') {
    console.log('Failed to get push token for push notification!')

    return
  }
  token = (await Notifications.getExpoPushTokenAsync()).data
  // } else {
  // console.log('Must use physical device for Push Notifications')
  // }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    }).catch(e => console.log(e))
  }

  return token
}

Notifications.setNotificationHandler({
  handleNotification: async notification => ({
    shouldShowAlert: (notification.request.content.title ?? '') !== '',
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
})

export default class App extends Component {
  state = {
    checkMeDone: false,
    loggedin: false,
  }

  constructor(props: any) {
    super(props)

    const lang = Localization.locale.split(/-/)[0]
    Language.getInstance().init(lang === 'de' ? 'de' : 'en', () => {
      APIUser.getMe(async me => {
        if (typeof me === 'boolean') {
          this.setState({ checkMeDone: true, loggedin: false })
        } else {
          const expoPushToken = await registerForPushNotificationsAsync()
          Notifications.addNotificationReceivedListener(this.handleNotification)

          Notifications.addNotificationResponseReceivedListener(
            this.handleNotificationResponse
          )
          if (expoPushToken && !me.profile.isAnon) {
            Socket.setPushToken(expoPushToken)
            APIUser.sendRemoteToken(expoPushToken)
          }
          this.setState({ checkMeDone: true, loggedin: me !== undefined })
        }
      })
    })
  }

  handleNotification = (notification: Notifications.Notification) => {
    console.log('notification', notification.request.content)

    return false
  }

  handleNotificationResponse = (response: any) => {
    // TODO: Add handler
    console.log('notification:response', response)
  }

  render() {
    return (
      <AppearanceProvider>
        <SafeAreaView>
          <StatusBar style="light" />
          <View style={MainWindowStyles.container}>
            <Router>
              <Index {...this.state} />
            </Router>
          </View>
        </SafeAreaView>
      </AppearanceProvider>
    )
  }
}
