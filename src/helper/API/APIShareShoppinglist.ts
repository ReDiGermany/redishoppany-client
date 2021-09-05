import { ICallbackBoolean } from '../../interfaces/ICallbacks'
import API from '../API'

export default class APIShareShoppinglist {
  public static async invite(
    listId: number,
    id: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/share/shoppinglist/invite', {
      listId,
      id,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async accept(id: number, callback?: ICallbackBoolean) {
    return API.put<boolean>('/share/shoppinglist/accept', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deny(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/shoppinglist/deny/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async revoke(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/shoppinglist/revoke/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
