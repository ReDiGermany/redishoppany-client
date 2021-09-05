import IAPICategory from '../../interfaces/IAPICategory'
import DB from '../DB'

export default class CategoryStorage extends DB {
  public static async set(id: number, list: IAPICategory[]) {
    await this.setItemJSON(`cat-${id}`, list)
  }

  public static async get(id: number): Promise<IAPICategory[] | null> {
    const list = await this.getItemJSON(`cat-${id}`)

    return list
  }
}
