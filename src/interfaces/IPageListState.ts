import IAlertProps from './IAlertProps'
import IAPICategory from './IAPICategory'
import IAPIShoppingListItemResponseItem from './IAPIShoppingListItemResponseItem'
import ISharedFriend from './ISharedFriend'
import IShoppingListCategory from './IShoppingListCategory'
import IShoppingListItem from './IShoppingListItem'

export default interface IPageListState {
  owned: boolean
  owner: string
  items: IShoppingListCategory[]
  newListCats: IAPICategory[]
  refreshing: boolean
  moveToListBox: boolean
  scrolling: boolean
  bottomBox: boolean
  settings: boolean
  newCatBox: boolean
  isTop: boolean
  preventScroll: boolean
  listName: string
  redirect: string
  listId: number
  bottomBoxState: number
  lists: IAPIShoppingListItemResponseItem[]
  newCatItem?: IShoppingListItem
  newItemList?: IShoppingListItem
  alert: IAlertProps
  keyboardHeight: number
  shareBox: boolean
  friends: ISharedFriend[]
}
