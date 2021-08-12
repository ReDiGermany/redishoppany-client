import IShoppingListCategory from './IShoppingListCategory'

export default interface IPageListState {
  items: IShoppingListCategory[]
  refreshing: boolean
  scrolling: boolean
  bottomBox: boolean
  settings: boolean
  preventScroll: boolean
  listName: string
  bottomBoxState: number
  lists: { onClick: () => void; name: string; active: boolean }[]
}
