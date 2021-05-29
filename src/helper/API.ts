import axios, { AxiosInstance } from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class API {
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

  public static async get(uri: string) {
    const username = (await AsyncStorage.getItem('redishoppany-email')) ?? ''
    const password = (await AsyncStorage.getItem('redishoppany-token')) ?? ''

    console.log('GETTING', uri, { username, password })

    const ret = await this.axiosInstance.get(uri, {
      auth: { username, password },
    })

    return ret.data
  }

  private initAPI() {
    this.axiosInstance = axios.create({
      baseURL: 'http://127.0.0.1:3001/',
      timeout: 1000,
    })
  }
}
