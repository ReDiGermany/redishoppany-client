import IAPIRecipe from '../../interfaces/IAPIRecipe'
import IAPIRecipeDetails from '../../interfaces/IAPIRecipeDetails'
import IAPIRecipeDetailsItem from '../../interfaces/IAPIRecipeDetailsItem'
import { ICallback, ICallbackBoolean } from '../../interfaces/ICallbacks'
import API from '../API'
import RecipeStorage from '../DB/RecipeStorage'

export default class APIRecipe {
  private static defaultGetSingle: IAPIRecipeDetails = {
    id: -1,
    image: '',
    lastCooked: '',
    name: '',
    owner: false,
    text: '',
    time: '',
  }

  public static async create(
    name: string,
    time: string,
    text: string,
    items: IAPIRecipeDetailsItem[],
    callback?: ICallbackBoolean
  ) {
    return API.post<boolean>('/recipe/create', {
      name,
      time,
      text,
      items,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async list(callback?: ICallback<IAPIRecipe[]>) {
    RecipeStorage.getList().then(list => {
      callback?.(list)
      API.get<IAPIRecipe[]>('/recipe').then(ret => {
        callback?.(ret ?? [])
        RecipeStorage.setList(ret ?? [])
      })
    })
  }

  public static async getSingle(
    id: number,
    callback?: ICallback<IAPIRecipeDetails>
  ) {
    return API.get<IAPIRecipeDetails>(`/recipe/${id}`).then(ret =>
      callback?.(ret ?? this.defaultGetSingle)
    )
  }

  public static async delete(id: number, callback?: ICallbackBoolean) {
    return API.delete<boolean>(`/recipe/delete/${id}`).then(ret =>
      callback?.(ret ?? false)
    )
  }

  public static async edit(
    id: number,
    name: string,
    time: string,
    text: string,
    items: IAPIRecipeDetailsItem[],
    callback?: ICallbackBoolean
  ) {
    return API.put<boolean>(`/recipe/update/${id}`, {
      id,
      name,
      time,
      text,
      items,
    }).then(ret => callback?.(ret ?? false))
  }

  public static async search(
    name: string,
    callback?: ICallback<IAPIRecipeDetails[]>
  ) {
    return API.put<IAPIRecipeDetails[]>('/recipe/find', { name }).then(ret =>
      callback?.(ret ?? [])
    )
  }
}
