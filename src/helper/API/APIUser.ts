import AsyncStorage from '@react-native-async-storage/async-storage'
import IAPIUserMe from '../../interfaces/IAPIUserMe'
import API from '../API'

export default class APIUser {
  public static async getMe(): Promise<IAPIUserMe> {
    const ret = await API.get('/user/me')

    return ret.data
  }

  public static async getMeByToken(password: string, username: string) {
    const ret = API.axiosInstance.get('/user/me', {
      auth: { password, username },
    })

    return ret
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

  public static async logout() {
    await API.get('/user/logout')

    return true
  }
}
