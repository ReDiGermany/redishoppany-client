import API from '../API'
import IAPICategory from '../../interfaces/IAPICategory'

export default class APIFoodplan {
  public static async create(name: string, list: number): Promise<boolean> {
    const ret = (await API.post)<boolean>('/category/create', { name, list })

    return ret
  }

  public static async sort(listId: number, ids: number[]): Promise<boolean> {
    const ret = (await API.put)<boolean>(`/category/${listId}`, { ids })

    return ret
  }

  public static async list(listId: number): Promise<IAPICategory[]> {
    const ret = (await API.get)<IAPICategory[]>(`/category/${listId}`)

    return ret
  }
}
