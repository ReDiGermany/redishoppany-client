import API from '../API'
import IShoppingList from '../../interfaces/IShoppingList'
import IAPIShoppingListResponse from '../../interfaces/IAPIShoppingListResponse'
import IAPIShoppingListItemResponse from '../../interfaces/IAPIShoppingListItemResponse'
import IAPIShoppingListItemResponseItem from '../../interfaces/IAPIShoppingListItemResponseItem'
import Language from '../../language/Language'
import { randomColor } from '../Functions'

export default class APIShoppingList {
  public static async updateItemCategory(
    itemId: number,
    catId: number
  ): Promise<boolean> {
    const ret = await API.post<boolean>('/shoppinglist/updatecat', {
      itemId,
      catId,
    })

    return ret ?? false
  }

  public static async deleteAllItems(id: number): Promise<boolean> {
    const ret = await API.get<boolean>(`/shoppinglist/clear/${id}`)

    return ret ?? false
  }

  public static async create(name: string): Promise<boolean> {
    const color = randomColor()
    const ret = await API.post<boolean>('/shoppinglist/create', { name, color })

    return ret ?? false
  }

  public static async list(): Promise<IAPIShoppingListItemResponse[]> {
    const ret =
      (await API.get<IAPIShoppingListResponse>('/shoppinglist')) ??
      this.defaultSimpleList

    return ret.items
  }

  private static defaultSimpleList: IAPIShoppingListResponse = {
    items: [],
    page: { count: 0, page: 0, limit: 0 },
  }

  public static async simpleList(): Promise<
    IAPIShoppingListItemResponseItem[]
  > {
    const ret =
      (await API.get<IAPIShoppingListResponse>('/shoppinglist')) ??
      this.defaultSimpleList

    const arr: IAPIShoppingListItemResponseItem[] = []

    ret.items.forEach(grp => {
      grp.items.forEach(item => {
        arr.push(item)
      })
    })

    return arr
  }

  public static async addToList(
    listId: number,
    name: string,
    amount: number
  ): Promise<boolean> {
    const ret = await API.post<boolean>(`/shoppinglist/item/add`, {
      listId,
      name,
      amount,
    })

    return ret ?? false
  }

  // TODO: Check
  private static defaultSingleList: IShoppingList = {
    categories: [],
    owned: true,
    owner: 'You',
    id: -1,
    name: '',
  }

  public static async singleList(id: number): Promise<IShoppingList> {
    const ret =
      (await API.get<IShoppingList>(`/shoppinglist/${id}`)) ??
      APIShoppingList.defaultSingleList

    ret.categories.push({
      color: '#111',
      id: -1,
      items: [],
      name: Language.get('items.bought'),
    })

    return ret
  }

  public static async deleteItemFromList(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/shoppinglist/${id}`)

    return ret ?? false
  }

  public static async deleteList(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/shoppinglist/destroy/${id}`)

    return ret ?? false
  }

  public static async moveItemToList(
    itemId: number,
    catId: number
  ): Promise<boolean> {
    const ret = await API.put<boolean>(`/shoppinglist/item`, {
      itemId,
      catId,
    })

    return ret ?? false
  }

  public static async setItemBought(itemId: number): Promise<boolean> {
    const ret = await API.putNoArgs<boolean>(
      `/shoppinglist/item/cart/${itemId}`
    )

    return ret ?? false
  }

  public static async setItemUnBought(itemId: number): Promise<boolean> {
    const ret = await API.putNoArgs<boolean>(
      `/shoppinglist/item/uncart/${itemId}`
    )

    return ret ?? false
  }

  public static async deleteBoughtItems(itemId: number): Promise<boolean> {
    const ret = await API.putNoArgs<boolean>(
      `/shoppinglist/deletebought/${itemId}`
    )

    return ret ?? false
  }
}
