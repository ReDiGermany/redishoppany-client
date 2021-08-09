import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class API {
  private initAPI() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.lisha-app.com',
      timeout: 1000,
    })
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
    const username = (await AsyncStorage.getItem('redishoppany-email')) ?? ''
    const password = (await AsyncStorage.getItem('redishoppany-token')) ?? ''

    return {
      auth: { username, password },
    }
  }

  public static async get<T>(uri: string): Promise<T> {
    const auth = await API.getAuth()
    // console.log('GETTING::init', uri, auth)
    const ret = await API.axiosInstance.get(uri, auth)
    // console.log('GETTING::ret', ret)
    if (ret.status < 200 || ret.status > 299)
      console.log('AXIOS::ERROR::GET', { uri, auth, ret })

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async post<T>(uri: string, data: any): Promise<T> {
    const auth = await API.getAuth()
    // console.log('POSTING', uri, data, auth)
    const ret = await API.axiosInstance.post(uri, data, auth)
    if (ret.status < 200 || ret.status > 299)
      console.log('AXIOS::ERROR::POST', { uri, auth, ret, data })

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async delete<T>(uri: string): Promise<T> {
    const auth = await API.getAuth()
    // console.log('DELETING', uri, auth)
    const ret = await API.axiosInstance.delete(uri, auth)
    if (ret.status < 200 || ret.status > 299)
      console.log('AXIOS::ERROR::DELETE', { uri, auth, ret })

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async put<T>(uri: string, data: any): Promise<T> {
    const auth = await API.getAuth()
    // console.log('PUTTING', uri, data, auth)
    const ret = await API.axiosInstance.put(uri, data, auth)
    if (ret.status < 200 || ret.status > 299)
      console.log('AXIOS::ERROR::PUT', { uri, auth, ret, data })

    if (typeof ret.data === 'object' && 'data' in ret.data) return ret.data.data

    return ret.data
  }

  public static async putNoArgs<T>(uri: string): Promise<T> {
    return this.put(uri, undefined)
  }
}
