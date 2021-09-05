import axios, { AxiosInstance } from 'axios'
import * as Constants from 'expo-constants'
import TokenStorage from './DB/TokenStorage'

// Error Handling from https://gist.github.com/fgilio/230ccd514e9381fafa51608fcf137253

export default class API {
  private static config = {
    baseURL: 'https://api.lisha-app.com',
    // baseURL: 'http://192.168.0.30:3001',
    timeout: 1000,
    httpAgent: Constants.default.deviceName,
    httpsAgent: Constants.default.deviceName,
  }

  private initAPI() {
    this.axiosInstance = axios.create(API.config)
  }

  private static INSTANCE: API

  private axiosInstance!: AxiosInstance

  public static get axiosInstance(): AxiosInstance {
    return this.getInstace().axiosInstance
  }

  public static getInstace() {
    if (!this.INSTANCE) {
      this.INSTANCE = new API()
      this.INSTANCE.initAPI()
    }

    return this.INSTANCE
  }

  private static async getAuth() {
    const { email: username, token: password } = await TokenStorage.get()

    return { auth: { username, password } }
  }

  public static async get<T>(uri: string): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.axiosInstance.get(uri, auth).catch(error => {
      console.log('AXIOS::GET::ERROR', { url: this.config.baseURL + uri, auth })
      // Error 😨
      if (error.response) {
        // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log(
          'error.response',
          error.response.status,
          error.response.statusText
        )
      } else if (error.request) {
        // The request was made but no response was received, `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in Node.js
        console.log('error.request', error.request)
      } else {
        // Something happened in setting up the request and triggered an Error
        console.log('Error', error.message)
      }
    })
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async post<T>(uri: string, data: any): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.axiosInstance.post(uri, data, auth).catch(error => {
      console.log('AXIOS::POST::ERROR', { uri, auth, data })
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
    })
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async delete<T>(uri: string): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.axiosInstance.delete(uri, auth).catch(error => {
      console.log('AXIOS::DELETE::ERROR', { uri, auth })
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
    })
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async put<T>(uri: string, data: any): Promise<T | null> {
    const auth = await API.getAuth()
    const ret = await API.axiosInstance.put(uri, data, auth).catch(error => {
      console.log('AXIOS::PUT::ERROR', { uri, auth, data })
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
    })
    if (!ret) return null

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async putNoArgs<T>(uri: string): Promise<T | null> {
    const t = await API.put<T>(uri, undefined)

    return t
  }
}
