import AsyncStorage from '@react-native-async-storage/async-storage'
import IAPIUserMe from '../../interfaces/IAPIUserMe'
import API from '../API'
import { IAPIVendorLogin } from '../../interfaces/IAPIVendorLogin'

export default class APIUser {
  public static async checkGoogleToken(
    token: string | null
  ): Promise<IAPIVendorLogin | boolean> {
    const ret = await API.post<IAPIVendorLogin>('/user/login/vendor/google', {
      token,
    })

    return ret ?? false
  }

  public static async checkFacebookToken(
    token: string
  ): Promise<IAPIVendorLogin | boolean> {
    const ret = await API.post<IAPIVendorLogin>('/user/login/vendor/facebook', {
      token,
    })

    return ret ?? false
  }

  public static async getMe(): Promise<IAPIUserMe | boolean> {
    const ret = await API.get<IAPIUserMe>('/user/me')

    return ret ?? false
  }

  public static async sendRemoteToken(token: string): Promise<boolean> {
    console.log(`sending token ${token}`)
    const ret = await API.post<boolean>(`/user/token/fcm`, { token }).catch(
      e => {
        console.log(`error sending token ${token}`)

        return e
      }
    )

    return ret.data ?? false
  }

  public static async getMeByToken(
    password: string,
    username: string
  ): Promise<IAPIUserMe | boolean> {
    const ret = await API.axiosInstance.get<IAPIUserMe>('/user/me', {
      auth: { password, username },
    })

    return ret.data ?? false
  }

  public static async checkLogin(
    email: string,
    password: string
  ): Promise<boolean> {
    const ret = await API.axiosInstance.post('/user/login', {
      email,
      password,
    })

    if (ret.status === 202) {
      await AsyncStorage.setItem('redishoppany-token', ret.data.data.token)
      await AsyncStorage.setItem('redishoppany-email', email)
    }

    return ret.status === 202
  }

  public static async logout(): Promise<boolean> {
    const ret = await API.get<boolean>('/user/logout')

    return ret ?? false
  }

  public static async register(
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    passwordConfirm: string
  ): Promise<boolean> {
    const ret = await API.post<boolean>('/user/register', {
      firstname,
      lastname,
      email,
      password,
      passwordConfirm,
    })

    return ret ?? false
  }
}
