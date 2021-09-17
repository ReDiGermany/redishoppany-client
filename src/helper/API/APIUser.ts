import AsyncStorage from '@react-native-async-storage/async-storage'
import IAPIUserMe from '../../interfaces/IAPIUserMe'
import API from '../API'
import { IAPIVendorLogin } from '../../interfaces/IAPIVendorLogin'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

export default class APIUser {
  public static async checkGoogleToken(
    token: string | null,
    callback?: ICallback<IAPIVendorLogin | boolean>
  ) {
    return API.post<IAPIVendorLogin>('/user/login/vendor/google', {
      token,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async checkFacebookToken(
    token: string,
    callback?: ICallback<IAPIVendorLogin | boolean>
  ) {
    return API.post<IAPIVendorLogin>('/user/login/vendor/facebook', {
      token,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async getMe(callback?: ICallback<IAPIUserMe | boolean>) {
    const password = (await AsyncStorage.getItem('token')) ?? ''
    const username = (await AsyncStorage.getItem('email')) ?? ''
    if (password !== '' && username !== '') {
      API.get<IAPIUserMe>('/user/me', ret => callback?.(ret))
    } else callback?.(false)
  }

  public static async sendRemoteToken(
    token: string,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/user/token/fcm', { token })
      .catch(e => {
        console.log(`error sending token ${token}`)

        return e
      })
      .then(ret => callback?.(ret.data ?? false))
  }

  public static async getMeByToken(
    password: string,
    username: string,
    callback?: ICallback<IAPIUserMe | boolean>
  ) {
    return API.getPubInstance()
      .get<{
        status: string
        success: boolean
        data: IAPIUserMe
      }>('/user/me', {
        auth: { password, username },
      })

      .then(ret => callback?.(ret.data.data ?? false))
  }

  public static async checkLogin(
    email: string,
    password: string,
    callback?: ICallbackBoolean
  ) {
    const ret = await API.getPubInstance().post('/user/login', {
      email,
      password,
    })

    if (ret.status === 202) {
      await AsyncStorage.setItem('token', ret.data.data.token)
      await AsyncStorage.setItem('email', email)
    }
    callback?.(ret.status === 202)
  }

  public static async logout(callback?: ICallbackBoolean) {
    return API.get<boolean>('/user/logout', ret => callback?.(ret ?? false))
  }

  public static async registerAnon(callback?: ICallbackBoolean) {
    const data = await API.getPubInstance().post<{
      data: { token: string; email: string }
      status: string
      success: boolean
    }>('/user/register/anon')

    if (!data) return false

    await AsyncStorage.setItem('token', data.data.data.token)
    await AsyncStorage.setItem('email', data.data.data.email)

    callback?.(true)

    return data
  }

  public static async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    passwordConfirm: string,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/user/register', {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
    }).then(ret => callback?.(ret ?? false))
  }
}
