import IFriend from '../../interfaces/IFriend'
import API from '../API'

interface IAPIFriendsList {
  friends?: IFriend[]
  incomming?: IFriend[]
  outgoing?: IFriend[]
}

export default class APIUser {
  public static async list(): Promise<IAPIFriendsList> {
    const ret = await API.get<IAPIFriendsList>('/friends')

    return ret
  }

  public static async shortList(): Promise<IFriend[]> {
    const ret = await API.get<IFriend[]>('/friends?short')

    return ret
  }

  public static async add(email: string): Promise<boolean> {
    const ret = await API.post<boolean>('/friends/add', { email })

    return ret
  }

  public static async accept(id: number): Promise<boolean> {
    const ret = await API.put<boolean>('/friends/accept', { id })

    return ret
  }

  public static async deny(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/deny/${id}`)

    return ret
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/delete/${id}`)

    return ret
  }

  public static async cancel(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/friends/cancel/${id}`)

    return ret
  }

  public static async qr(): Promise<string> {
    const ret = await API.get<string>('/friends/qr')

    return ret
  }
}
