import API from '../API'
import IShoppingList from '../../interfaces/IShoppingList'
import IAPIShoppingListResponse from '../../interfaces/IAPIShoppingListResponse'

export default class APIShoppingList {
  public static async create(name: string): Promise<boolean> {
    const ret = (await API.post)<boolean>('/shoppinglist/create', { name })

    return ret
  }

  public static async list(): Promise<IAPIShoppingListResponse> {
    const ret = (await API.get)<IAPIShoppingListResponse>('/shoppinglist')

    return ret
  }

  public static async addToList(
    listId: number,
    name: string,
    amount: number
  ): Promise<boolean> {
    const ret = (await API.post)<boolean>(`/shoppinglist/item/add`, {
      listId,
      name,
      amount,
    })

    return ret
  }

  public static async singleList(id: number): Promise<IShoppingList> {
    const ret = (await API.get)<IShoppingList>(`/shoppinglist/${id}`)

    return ret
  }

  public static async deleteItemFromList(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/shoppinglist/${id}`)

    return ret
  }

  public static async deleteList(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/shoppinglist/deletelist/${id}`)

    return ret
  }

  public static async moveItemToList(
    itemId: number,
    catId: number
  ): Promise<boolean> {
    const ret = (await API.put)<boolean>(`/shoppinglist/item`, {
      itemId,
      catId,
    })

    return ret
  }

  public static async setItemBought(itemId: number): Promise<boolean> {
    const ret = (await API.putNoArgs)<boolean>(
      `/shoppinglist/item/cart/${itemId}`
    )

    return ret
  }

  public static async setItemUnbought(itemId: number): Promise<boolean> {
    const ret = (await API.putNoArgs)<boolean>(
      `/shoppinglist/item/uncart/${itemId}`
    )

    return ret
  }

  public static async deleteBoughtItems(itemId: number): Promise<boolean> {
    const ret = (await API.putNoArgs)<boolean>(
      `/shoppinglist/deletebought/${itemId}`
    )

    return ret
  }
}
