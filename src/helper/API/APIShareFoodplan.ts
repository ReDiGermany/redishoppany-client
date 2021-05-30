import API from '../API'

export default class APIShareFoodplan {
  public static async invite(id: number): Promise<boolean> {
    const ret = (await API.post)<boolean>('/share/foodplan/invite', { id })

    return ret
  }

  public static async accept(id: number): Promise<boolean> {
    const ret = (await API.put)<boolean>('/share/foodplan/accept', { id })

    return ret
  }

  public static async deny(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/share/foodplan/deny/${id}`)

    return ret
  }

  public static async revoke(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/share/foodplan/revoke/${id}`)

    return ret
  }
}