import API from '../API'
import IFoodplanPlan from '../../interfaces/IFoodplanPlan'
import IFoodplanKw from '../../interfaces/IFoodplanKw'

export default class APIFoodplan {
  public static async add(recipe: number): Promise<boolean> {
    return this.addToDate(recipe, undefined)
  }

  public static async addToDate(
    recipe: number,
    date?: string
  ): Promise<boolean> {
    const ret = (await API.post)<boolean>('/foodplan/add', { recipe, date })

    return ret
  }

  public static async list(): Promise<IFoodplanKw[]> {
    const ret = (await API.get)<IFoodplanKw[]>('/foodplan')

    return ret
  }

  public static async remove(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/foodplan/delete/${id}`)

    return ret
  }

  public static async addToCart(
    itemId: number,
    listId: number
  ): Promise<boolean> {
    const ret = await API.post<boolean>('/foodplan/cart', { itemId, listId })

    return ret
  }

  public static async sort(nums: number[]): Promise<boolean> {
    const ret = await API.post<boolean>('/foodplan/sort', nums)

    return ret
  }

  public static async changePlan(id: number): Promise<boolean> {
    const ret = await API.put<boolean>('/foodplan/plans', { id })

    return ret
  }

  public static async listPlans(): Promise<IFoodplanPlan[]> {
    const ret = await API.get<IFoodplanPlan[]>('/foodplan/plans')

    return ret
  }
}
