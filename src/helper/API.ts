import AsyncStorage from '@react-native-async-storage/async-storage'
import axios, { AxiosInstance } from 'axios'
import * as Localization from 'expo-localization'
import * as Constants from 'expo-constants'
import { ICallback } from '../interfaces/ICallbacks'
import { getAuth, getPubAuth } from './Functions'
import Socket from './Socket'

// Error Handling from https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253

export default class API {
  public static domain = 'http://192.168.0.30:3001'

  // public static domain = 'https://api.lisha-app.com'

  private static config = {
    baseURL: this.domain,
    timeout: 1000,
    httpAgent: Constants.default.deviceName,
    httpsAgent: Constants.default.deviceName,
  }

  private static INSTANCE: API

  private axiosInstance!: AxiosInstance

  private initAPI() {
    this.axiosInstance = axios.create(API.config)
  }

  public static getInstace() {
    if (!this.INSTANCE) {
      this.INSTANCE = new API()
      this.INSTANCE.initAPI()
    }

    return this.INSTANCE
  }

  public static getPubInstance() {
    return API.getInstace().axiosInstance
  }

  public static async getAuth() {
    const auth = await getAuth()

    return auth
  }

  public static async getPubAuth() {
    const auth = await getPubAuth()

    return auth
  }

  private static getUrl(uri: string) {
    return `${uri + (uri.match(/\?/) ? '&' : '?')}lang=${Localization.locale}`
  }

  public static async get<T>(
    uri: string,
    callback?: ICallback<T>,
    noCache: boolean = false
  ) {
    AsyncStorage.getItem(uri).then(async strRet => {
      if (strRet && !noCache) {
        const storeData: T = JSON.parse(strRet)
        callback?.(storeData)
      }
      this.cacheFromAPI<T>(uri, callback)
      Socket.onReload(uri, () => {
        this.cacheFromAPI<T>(uri, callback)
      })

      return true
    })
  }

  public static async cacheFromAPI<T>(uri: string, callback?: ICallback<T>) {
    const auth = await API.getAuth()
    const ret = await API.getInstace()
      .axiosInstance.get(this.getUrl(uri), auth)
      .catch(error => this.handleError(error, uri, auth, 'get'))
    if (!ret) return null

    const returnData =
      typeof ret.data === 'object' && 'data' in ret.data
        ? ret.data.data
        : ret.data
    callback?.(returnData)
    await AsyncStorage.setItem(uri, JSON.stringify(returnData))

    return true
  }

  public static async post<T>(uri: string, data: any): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.getInstace()
      .axiosInstance.post(this.getUrl(uri), data, auth)
      .catch(error => this.handleError(error, uri, auth, 'post', data))
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async delete<T>(uri: string): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.getInstace()
      .axiosInstance.delete(this.getUrl(uri), auth)
      .catch(error => this.handleError(error, uri, auth, 'delete'))
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async put<T>(
    uri: string,
    data: any = undefined
  ): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.getInstace()
      .axiosInstance.put(this.getUrl(uri), data, auth)
      .catch(error => this.handleError(error, uri, auth, 'put'))
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  private static async handleError(
    error: any,
    uri: string,
    auth: any,
    type: string,
    info: any = undefined
  ) {
    console.log(`AXIOS::${type.toUpperCase()}::ERROR`, { uri, auth, info })
    // Error 😨
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.log('error.response', error.response.status, error.response)
    } else if (error.request) {
      // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
      console.log('error.request', error.request)
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log('Error', error.message)
    }

    return error
  }
}
