import API from '../API'
import IAPIShareFoodplanFriends from '../../interfaces/IAPIShareFoodplanFriends'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

export default class APIShareFoodplan {
  public static async invite(id: number, callback?: ICallbackBoolean) {
    return API.post<boolean>('/share/foodplan/invite', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async accept(id: number, callback?: ICallbackBoolean) {
    return API.put<boolean>('/share/foodplan/accept', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deny(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/foodplan/deny/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async revoke(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/foodplan/revoke/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async list(callback?: ICallback<IAPIShareFoodplanFriends[]>) {
    return API.get<IAPIShareFoodplanFriends[]>(`/share/foodplan/invite`).then(
      ret => callback?.(ret ?? [])
    )
  }
}
