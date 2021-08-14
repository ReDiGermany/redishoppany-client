import API from '../API'
import IAPICategory from '../../interfaces/IAPICategory'

export default class APICategory {
  public static async create(
    name: string,
    color: string,
    list: number
  ): Promise<boolean> {
    const ret = (await API.post)<boolean>('/category/create', {
      name,
      list,
      color,
    })

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

  public static async update(item: IAPICategory): Promise<boolean> {
    const ret = (await API.post)<boolean>(`/category/update/${item.id}`, item)

    return ret
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/category/${id}`)

    return ret
  }
}
