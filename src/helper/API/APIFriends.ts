import IAPIUserMe from '../../interfaces/IAPIUserMe'
import IFriend from '../../interfaces/IFriend'
import API from '../API'

export default class APIUser {
  public static async list(): Promise<IAPIUserMe> {
    const ret = await API.get('/friends')

    return ret.data
  }

  public static async shortList(): Promise<IFriend[]> {
    const ret = await API.get('/friends?short')

    return ret.data
  }
}
