import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class API {
  private initAPI() {
    this.axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:3001/',
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
    const auth = await this.getAuth()
    console.log('GETTING', uri, auth)
    const ret = await this.axiosInstance.get(uri, auth)

    return ret.data.data
  }

  public static async post<T>(uri: string, data: any): Promise<T> {
    const auth = await this.getAuth()
    console.log('POSTING', uri, data, auth)
    const ret = await this.axiosInstance.post(uri, data, auth)

    return ret.data.data
  }

  public static async delete<T>(uri: string): Promise<T> {
    const auth = await this.getAuth()
    console.log('DELETING', uri, auth)
    const ret = await this.axiosInstance.delete(uri, auth)

    return ret.data.data
  }

  public static async put<T>(uri: string, data: any): Promise<T> {
    const auth = await this.getAuth()
    console.log('PUTTING', uri, data, auth)
    const ret = await this.axiosInstance.put(uri, data, auth)

    return ret.data.data
  }

  public static async putNoArgs<T>(uri: string): Promise<T> {
    return this.put(uri, undefined)
  }
}
