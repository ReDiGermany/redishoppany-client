import IShoppingListItem from './IShoppingListItem'

export default interface IShoppingListCategory {
  id: number
  name: string
  color: string
  items: IShoppingListItem[]
}
