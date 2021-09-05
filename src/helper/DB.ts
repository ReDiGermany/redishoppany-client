import AsyncStorage from '@react-native-async-storage/async-storage'

export default class DB {
  protected static async getItem(name: string): Promise<string | null> {
    const item = await AsyncStorage.getItem(name)

    return item
  }

  protected static async getItemJSON<T>(name: string): Promise<T | null> {
    const item = await this.getItem(name)
    if (item) return JSON.parse(item)

    return null
  }

  protected static async setItem(name: string, value: string): Promise<void> {
    await AsyncStorage.setItem(name, value)
  }

  protected static async setItemJSON(name: string, value: any): Promise<void> {
    await this.setItem(name, JSON.stringify(value))
  }
}
