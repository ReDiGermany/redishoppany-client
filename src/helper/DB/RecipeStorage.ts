import IAPIRecipe from '../../interfaces/IAPIRecipe'
import DB from '../DB'

export default class RecipeStorage extends DB {
  public static async getList(): Promise<IAPIRecipe[]> {
    const list = await this.getItemJSON<IAPIRecipe[]>('recipe-list')

    return list ?? []
  }

  public static async setList(list: IAPIRecipe[]): Promise<void> {
    await this.setItemJSON('recipe-list', list)
  }
}
