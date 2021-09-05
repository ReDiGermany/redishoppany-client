import API from '../API'
import IShoppingList from '../../interfaces/IShoppingList'
import IAPIShoppingListResponse from '../../interfaces/IAPIShoppingListResponse'
import IAPIShoppingListItemResponse from '../../interfaces/IAPIShoppingListItemResponse'
import IAPIShoppingListItemResponseItem from '../../interfaces/IAPIShoppingListItemResponseItem'
import Language from '../../language/Language'
import { randomColor } from '../Functions'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'

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
    return API.get<boolean>(`/shoppinglist/clear/${id}`).then(ret =>
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
    return API.get<IAPIShoppingListResponse>('/shoppinglist')
      .then(ret => (ret === null ? this.defaultSimpleList : ret))
      .then(ret => callback?.(ret.items))
  }

  // TODO: do
  public static async simpleList(
    callback?: ICallback<IAPIShoppingListItemResponseItem[]>
  ) {
    return API.get<IAPIShoppingListResponse>('/shoppinglist')
      .then(ret => (ret === null ? this.defaultSimpleList : ret))
      .then(ret => {})
    // this.defaultSimpleList

    // const arr: IAPIShoppingListItemResponseItem[] = []

    // ret.items.forEach(grp => {
    //   grp.items.forEach(item => {
    //     arr.push(item)
    //   })
    // })

    // return arr
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
    callback: ICallback<IShoppingList>
  ) {
    return API.get<IShoppingList>(`/shoppinglist/${id}`).then(ret =>
      callback?.({ ...(ret ?? this.defaultSingleList) })
    )

    // ret.categories.push({
    //   color: '#111',
    //   id: -1,
    //   items: [],
    //   name: Language.get('items.bought'),
    // })

    // return ret
  }

  public static async deleteItemFromList(
    id: number,
    callback?: ICallbackBoolean
  ) {
    return API.delete<boolean>(`/shoppinglist/${id}`).then(ret =>
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
    return API.putNoArgs<boolean>(`/shoppinglist/item/cart/${itemId}`).then(
      ret => callback?.(ret ?? false)
    )
  }

  public static async setItemUnBought(
    itemId: number,
    callback?: ICallbackBoolean
  ) {
    return API.putNoArgs<boolean>(`/shoppinglist/item/uncart/${itemId}`).then(
      ret => callback?.(ret ?? false)
    )
  }

  public static async deleteBoughtItems(
    itemId: number,
    callback?: ICallbackBoolean
  ) {
    return API.putNoArgs<boolean>(`/shoppinglist/deletebought/${itemId}`).then(
      ret => callback?.(ret ?? false)
    )
  }
}
