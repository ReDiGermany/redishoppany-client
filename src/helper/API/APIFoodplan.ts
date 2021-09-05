import API from '../API'
import IFoodplanPlan from '../../interfaces/IFoodplanPlan'
import IFoodplanKw from '../../interfaces/IFoodplanKw'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

export default class APIFoodplan {
  public static async add(recipe: number, callback?: ICallbackBoolean) {
    return this.addToDate(recipe, callback, undefined)
  }

  public static async addToDate(
    recipe: number,
    callback?: ICallbackBoolean,
    date?: string
  ) {
    return API.post<boolean>('/foodplan/add', { recipe, date }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async list(callback?: ICallback<IFoodplanKw[]>) {
    return API.get<IFoodplanKw[]>('/foodplan').then(ret =>
      callback?.(ret ?? [])
    )
  }

  public static async remove(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/foodplan/delete/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async addToCart(
    itemId: number,
    listId: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/foodplan/cart', { itemId, listId }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async sort(nums: number[], callback?: ICallbackBoolean) {
    return API.post<boolean>('/foodplan/sort', nums).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async changePlan(id: number, callback?: ICallbackBoolean) {
    return API.put<boolean>('/foodplan/plans', { id }).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async listPlans(callback?: ICallback<IFoodplanPlan[]>) {
    return API.get<IFoodplanPlan[]>('/foodplan/plans').then(ret =>
      callback?.(ret ?? [])
    )
  }
}
