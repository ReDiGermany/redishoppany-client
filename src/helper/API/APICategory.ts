import API from '../API'
import IAPICategory from '../../interfaces/IAPICategory'
import CategoryStorage from '../DB/CategoryStorage'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

export default class APICategory {
  public static async create(
    name: string,
    color: string,
    list: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/category/create', {
      name,
      list,
      color,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async sort(
    listId: number,
    ids: number[],
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/category/${listId}`, { ids }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async list(
    listId: number,
    callback?: ICallback<IAPICategory[]>
  ) {
    return API.get<IAPICategory[]>(`/category/${listId}`).then(ret => {
      if (ret) {
        callback?.(ret ?? [])
        CategoryStorage.set(listId, ret ?? [])
      }
    })
  }

  public static async update(item: IAPICategory, callback?: ICallbackBoolean) {
    return API.post<boolean>(`/category/update/${item.id}`, item).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async delete(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/category/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
