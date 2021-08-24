import API from '../API'

export default class APIShareShoppinglist {
  public static async invite(listId: number, id: number): Promise<boolean> {
    const ret = await API.post<boolean>('/share/shoppinglist/invite', {
      listId,
      id,
    })

    return ret ?? false
  }

  public static async accept(id: number): Promise<boolean> {
    const ret = await API.put<boolean>('/share/shoppinglist/accept', { id })

    return ret ?? false
  }

  public static async deny(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/share/shoppinglist/deny/${id}`)

    return ret ?? false
  }

  public static async revoke(id: number): Promise<boolean> {
    const ret = await API.delete<boolean>(`/share/shoppinglist/revoke/${id}`)

    return ret ?? false
  }
}
