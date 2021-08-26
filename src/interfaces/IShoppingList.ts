import IShoppingListCategories from './IShoppingListCategory'

export default interface IShoppingList {
  id: number
  name: string
  owned: boolean
  owner: string
  categories: IShoppingListCategories[]
}
