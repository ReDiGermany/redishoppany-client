import IAPIUserMe from '../../interfaces/IAPIUserMe'
import { ICallbackString } from '../../interfaces/ICallbacks'
import DB from '../DB'

export default class UserStorage extends DB {
  public static async get(): Promise<IAPIUserMe | boolean> {
    const item = await this.getItemJSON<IAPIUserMe>('user')
    if (!item) return false

    return item
  }

  public static async set(user: IAPIUserMe): Promise<void> {
    await this.setItemJSON('user', user)
  }

  public static async getQR(callback: ICallbackString) {
    const item = await this.getItem('qr')

    callback(item ?? '')
  }

  public static async setQR(qrcode: string) {
    await this.setItem('qr', qrcode)
  }
}
