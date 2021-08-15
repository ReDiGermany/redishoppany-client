import IAPICategory from './IAPICategory'
import IAPIShoppingListItemResponseItem from './IAPIShoppingListItemResponseItem'
import IShoppingListCategory from './IShoppingListCategory'
import IShoppingListItem from './IShoppingListItem'

export default interface IPageListState {
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
}
