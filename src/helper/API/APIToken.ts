import ITokenList from '../../interfaces/ITokenList'
import API from '../API'

export default class APIToken {
  public static async list(): Promise<ITokenList> {
    const ret = (await API.get)<ITokenList>('/user/token')

    return ret
  }

  public static async deleteAll(): Promise<boolean> {
    const ret = await API.delete<boolean>('/user/token')

    return ret
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/user/token/${id}`)

    return ret
  }
}
