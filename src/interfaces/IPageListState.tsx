import IAPIShoppingListItemResponseItem from './IAPIShoppingListItemResponseItem'
import IShoppingListCategory from './IShoppingListCategory'

export default interface IPageListState {
  items: IShoppingListCategory[]
  refreshing: boolean
  scrolling: boolean
  bottomBox: boolean
  settings: boolean
  isTop: boolean
  preventScroll: boolean
  listName: string
  listId: number
  bottomBoxState: number
  lists: IAPIShoppingListItemResponseItem[]
}
