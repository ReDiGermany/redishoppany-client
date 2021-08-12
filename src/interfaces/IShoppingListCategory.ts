import IShoppingListItem from './IShoppingListItem'

export default interface IShoppingListCategory {
  id: number
  name: string
  items: IShoppingListItem[]
}
