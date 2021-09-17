import API from '../API'
import IShoppingList from '../../interfaces/IShoppingList'
import IAPIShoppingListResponse from '../../interfaces/IAPIShoppingListResponse'
import IAPIShoppingListItemResponse from '../../interfaces/IAPIShoppingListItemResponse'
import IAPIShoppingListItemResponseItem from '../../interfaces/IAPIShoppingListItemResponseItem'
import { randomColor } from '../Functions'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import Language from '../../language/Language'

export default class APIShoppingList {
  private static defaultSimpleList: IAPIShoppingListResponse = {
    items: [],
    page: { count: 0, page: 0, limit: 0 },
  }

  // TODO: Check
  private static defaultSingleList: IShoppingList = {
    categories: [],
    owned: true,
    owner: 'You',
    id: -1,
    name: '',
  }

  public static async updateItemCategory(
    itemId: number,
    catId: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/shoppinglist/updatecat', {
      itemId,
      catId,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async deleteAllItems(id: number, callback?: ICallbackBoolean) {
    return API.get<boolean>(`/shoppinglist/clear/${id}`, ret =>
      callback?.(ret ?? false)
    )
  }

  public static async create(name: string, callback?: ICallbackBoolean) {
    const color = randomColor()

    return API.post<boolean>('/shoppinglist/create', { name, color }).then(
      ret => callback?.(ret ?? false)
    )
  }

  public static async list(
    callback?: ICallback<IAPIShoppingListItemResponse[]>
  ) {
    return API.get<IAPIShoppingListResponse>('/shoppinglist', ret =>
      callback?.((ret === null ? this.defaultSimpleList : ret).items)
    )
  }

  // TODO: do
  public static async simpleList(
    callback?: ICallback<IAPIShoppingListItemResponseItem[]>
  ) {
    return this.list(ret => {
      callback?.(ret.map(user => user.items).flat())
    })
  }

  public static async addToList(
    listId: number,
    name: string,
    amount: number,
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>(`/shoppinglist/item/add`, {
      listId,
      name,
      amount,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async singleList(
    id: number,
    callback: ICallback<IShoppingList>,
    noCache: boolean = false
  ) {
    return API.get<IShoppingList>(
      `/shoppinglist/${id}`,
      ret => {
        const data = ret ?? this.defaultSingleList
        data.categories.push({
          color: '#111',
          id: -1,
          items: [],
          name: Language.get('items.bought'),
        })
        callback?.(data)
      },
      noCache
    )
  }

  public static async deleteItemFromList(
    id: number,
    callback?: ICallbackBoolean
  ) {
    return API.delete<boolean>(`/shoppinglist/item/delete/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deleteList(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/shoppinglist/destroy/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async moveItemToList(
    itemId: number,
    catId: number,
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/shoppinglist/item`, {
      itemId,
      catId,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async setItemBought(
    itemId: number,
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/shoppinglist/item/cart/${itemId}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async setItemUnBought(
    itemId: number,
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/shoppinglist/item/uncart/${itemId}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async deleteBoughtItems(
    itemId: number,
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/shoppinglist/deletebought/${itemId}`).then(ret =>
      callback?.(ret ?? false)
    )
  }
}
