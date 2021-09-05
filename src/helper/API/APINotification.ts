import API from '../API'
import IAPINotification from '../../interfaces/IAPINotification'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

export default class APINotification {
  public static async list(callback?: ICallback<IAPINotification[]>) {
    return API.get<IAPINotification[]>('/notification').then(ret =>
      callback?.(ret ?? [])
    )
  }

  public static async delete(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/notification/delete/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deleteAll(callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/notification/delete`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
