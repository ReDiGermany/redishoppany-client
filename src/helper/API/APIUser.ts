import IAPIUserMe from '../../interfaces/IAPIUserMe'
import API from '../API'
import { IAPIVendorLogin } from '../../interfaces/IAPIVendorLogin'
import TokenStorage from '../DB/TokenStorage'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import UserStorage from '../DB/UserStorage'

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
    const hasToken = await TokenStorage.exists()
    if (hasToken) {
      UserStorage.get().then(user => {
        callback?.(user)
        API.get<IAPIUserMe>('/user/me').then(ret => {
          if (ret) {
            callback?.(ret)
            UserStorage.set(ret)
          }
        })
      })
    } else callback?.(false)
  }

  public static async sendRemoteToken(
    token: string,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>(`/user/token/fcm`, { token })
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
    return API.axiosInstance
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
    const ret = await API.axiosInstance.post('/user/login', {
      email,
      password,
    })

    if (ret.status === 202) await TokenStorage.set(email, ret.data.data.token)

    callback?.(ret.status === 202)
  }

  public static async logout(callback?: ICallbackBoolean) {
    return API.get<boolean>('/user/logout').then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async registerAnon(callback?: ICallbackBoolean) {
    const data = await API.axiosInstance.post<{
      data: { token: string; email: string }
      status: string
      success: boolean
    }>('/user/register/anon')

    if (!data) return false

    await TokenStorage.set(data.data.data.email, data.data.data.token)

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
