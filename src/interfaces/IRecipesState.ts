import IAPIRecipe from './IAPIRecipe'

export default interface IRecipesState {
  recipes: IAPIRecipe[]
  redirect: string
  showOnly: string
  refreshing: boolean
  isTop: boolean
}
