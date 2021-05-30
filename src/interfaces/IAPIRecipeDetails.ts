import IAPIRecipe from './IAPIRecipe'
import IAPIRecipeDetailsItem from './IAPIRecipeDetailsItem'

export default interface IAPIRecipeDetails extends IAPIRecipe {
  lastCooked: string
  text: string
  items?: IAPIRecipeDetailsItem[]
}
