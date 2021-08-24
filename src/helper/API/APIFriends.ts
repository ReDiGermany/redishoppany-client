import IFriend from '../../interfaces/IFriend'
import API from '../API'
import IAPIFriendsList from '../../interfaces/IAPIFriendsList'

export default class APIFriends {
  private static defaultList: IAPIFriendsList = {
    friends: [],
    incomming: [],
    outgoing: [],
  }

  public static async list(): Promise<IAPIFriendsList> {
    const ret = await API.get<IAPIFriendsList>('/friends')

    return ret ?? this.defaultList
  }

  public static async shortList(): Promise<IFriend[]> {
    const ret = await API.get<IFriend[]>('/friends?short')

    return ret ?? []
  }

  public static async add(email: string): Promise<boolean> {
    const ret = await API.post<boolean>('/friends/add', { email })

    return ret ?? false
  }

  public static async accept(id: number): Promise<boolean> {
    const ret = await API.put<boolean>('/friends/accept', { id })

    return ret ?? false
  }

  public static async deny(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/deny/${id}`)

    return ret ?? false
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/delete/${id}`)

    return ret ?? false
  }

  public static async cancel(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/cancel/${id}`)

    return ret ?? false
  }

  public static async qr(): Promise<string> {
    const ret = await API.get<string>('/friends/qr')

    return ret ?? ''
  }
}
