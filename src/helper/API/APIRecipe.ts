import IAPIRecipe from '../../interfaces/IAPIRecipe'
import IAPIRecipeDetails from '../../interfaces/IAPIRecipeDetails'
import IAPIRecipeDetailsItem from '../../interfaces/IAPIRecipeDetailsItem'
import API from '../API'

export default class APIRecipe {
  public static async create(
    name: string,
    time: string,
    text: string,
    items: IAPIRecipeDetailsItem[]
  ): Promise<boolean> {
    const ret = await API.post<boolean>('/recipe/create', {
      name,
      time,
      text,
      items,
    })

    return ret ?? false
  }

  public static async list(): Promise<IAPIRecipe[]> {
    const ret = await API.get<IAPIRecipe[]>('/recipe')

    return ret ?? []
  }

  private static defaultGetSingle: IAPIRecipeDetails = {
    id: -1,
    image: '',
    lastCooked: '',
    name: '',
    owner: false,
    text: '',
    time: '',
  }

  public static async getSingle(id: number): Promise<IAPIRecipeDetails> {
    const ret = await API.get<IAPIRecipeDetails>(`/recipe/${id}`)

    return ret ?? this.defaultGetSingle
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/recipe/delete/${id}`)

    return ret ?? false
  }

  public static async edit(
    id: number,
    name: string,
    time: string,
    text: string,
    items: IAPIRecipeDetailsItem[]
  ): Promise<boolean> {
    const ret = await API.put<boolean>(`/recipe/update/${id}`, {
      id,
      name,
      time,
      text,
      items,
    })

    return ret ?? false
  }

  public static async search(name: string): Promise<IAPIRecipeDetails[]> {
    const ret = await API.put<IAPIRecipeDetails[]>('/recipe/find', { name })

    return ret ?? []
  }
}
