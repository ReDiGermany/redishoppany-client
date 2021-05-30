import API from '../API'

export default class APIShareRecipe {
  public static async invite(recipeId: number, id: number): Promise<boolean> {
    const ret = (await API.post)<boolean>('/share/recipe/invite', {
      recipeId,
      id,
    })

    return ret
  }

  public static async accept(id: number): Promise<boolean> {
    const ret = (await API.put)<boolean>('/share/recipe/accept', { id })

    return ret
  }

  public static async deny(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/share/recipe/deny/${id}`)

    return ret
  }

  public static async revoke(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/share/recipe/revoke/${id}`)

    return ret
  }
}
