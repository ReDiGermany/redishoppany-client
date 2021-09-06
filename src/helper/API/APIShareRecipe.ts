import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import API from '../API'
import ISharedFriend from '../../interfaces/ISharedFriend'

export default class APIShareRecipe {
  static list(listId: number, callback?: ICallback<ISharedFriend[]>) {
    return API.get<ISharedFriend[]>(`/share/recipe/list/${listId}`, callback)
  }

  public static async invite(
    recipeId: number,
    id: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/share/recipe/invite', {
      recipeId,
      id,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async accept(id: number, callback?: ICallbackBoolean) {
    return API.put<boolean>('/share/recipe/accept', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deny(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/recipe/deny/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async revoke(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/share/recipe/revoke/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
