import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import ISharedFriend from '../../interfaces/ISharedFriend'
import API from '../API'

export default class APIShareShoppinglist {
  public static async friends(
    listId: number,
    callback: ICallback<ISharedFriend[]>
  ) {
    return API.get<ISharedFriend[]>(
      `/share/shoppinglist/friends/${listId}`,
      ret => callback?.(ret ?? [])
    )
  }

  public static async leave(listId: number) {
    return API.delete<boolean>(`/share/shoppinglist/leave/${listId}`)
  }

  // TODO: After Login connect to socket

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
