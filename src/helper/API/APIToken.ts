import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import ITokenList from '../../interfaces/ITokenList'
import API from '../API'

export default class APIToken {
  private static defaultListResponse = {
    items: [],
    page: {
      count: 0,
      page: 0,
      limit: 0,
    },
  }

  public static async list(callback?: ICallback<ITokenList>) {
    return API.get<ITokenList>('/user/token', ret =>
      callback?.(ret ?? this.defaultListResponse)
    )
  }

  public static async deleteAll(callback?: ICallbackBoolean) {
    return API.delete<boolean>('/user/token').then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async delete(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/user/token/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
