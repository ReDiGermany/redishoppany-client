import AsyncStorage from '@react-native-async-storage/async-storage'
import IAPIUserMe from '../../interfaces/IAPIUserMe'
import API from '../API'

export default class APIUser {
  public static async getMe(): Promise<IAPIUserMe> {
    const ret = await API.get<IAPIUserMe>('/user/me')

    return ret
  }

  public static async getMeByToken(
    password: string,
    username: string
  ): Promise<IAPIUserMe> {
    const ret = await API.axiosInstance.get<IAPIUserMe>('/user/me', {
      auth: { password, username },
    })

    return ret.data
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
      AsyncStorage.setItem('redishoppany-token', ret.data.data.token)
      AsyncStorage.setItem('redishoppany-email', email)
    }

    return ret.status === 202
  }

  public static async logout(): Promise<boolean> {
    const ret = await API.get<boolean>('/user/logout')

    return ret
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

    return ret
  }
}
