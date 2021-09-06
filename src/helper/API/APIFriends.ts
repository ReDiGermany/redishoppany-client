import IFriend from '../../interfaces/IFriend'
import API from '../API'
import IAPIFriendsList from '../../interfaces/IAPIFriendsList'
import {
  ICallback,
  ICallbackBoolean,
  ICallbackString,
} from '../../interfaces/ICallbacks'

export default class APIFriends {
  private static defaultList: IAPIFriendsList = {
    friends: [],
    incomming: [],
    outgoing: [],
  }

  public static async list(callback?: ICallback<IAPIFriendsList>) {
    return API.get<IAPIFriendsList>('/friends', ret =>
      callback?.(ret ?? this.defaultList)
    )
  }

  public static async shortList(callback?: ICallback<IFriend[]>) {
    return API.get<IFriend[]>('/friends?short', ret => callback?.(ret ?? []))
  }

  public static async add(
    email: string,
    isMail: boolean,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>(
      '/friends/add',
      isMail ? { email } : { uuid: email }
    ).then(ret => callback?.(ret ?? false))
  }

  public static async accept(id: number, callback?: ICallbackBoolean) {
    return API.put<boolean>('/friends/accept', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deny(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/friends/deny/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async delete(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/friends/delete/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async cancel(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/friends/cancel/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async qr(callback?: ICallbackString) {
    API.get<string>('/friends/qr', ret => {
      callback?.(ret ?? '')
    })
  }
}
