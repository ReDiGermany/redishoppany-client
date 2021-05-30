import IShoppingListCategories from './IShoppingListCategory'

export default interface IShoppingList {
  id: number
  name: string
  categories: IShoppingListCategories[]
}
