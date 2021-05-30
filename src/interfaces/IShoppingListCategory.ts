interface IShoppingListItem {
  name: string
  visible: boolean
  open: boolean
  id: number
  amount: number
  inCart: boolean
}
export default interface IShoppingListCategory {
  id: number
  name: string
  items: IShoppingListItem[]
}
