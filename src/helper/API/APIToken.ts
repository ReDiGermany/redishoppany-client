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

  public static async list(): Promise<ITokenList> {
    const ret = await API.get<ITokenList>('/user/token')

    return ret ?? this.defaultListResponse
  }

  public static async deleteAll(): Promise<boolean> {
    const ret = await API.delete<boolean>('/user/token')

    return ret ?? false
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/user/token/${id}`)

    return ret ?? false
  }
}
