import API from '../API'

interface IAPINotification {
  id: number
  name: string
  info: string
  seen: boolean
}

export default class APINotification {
  public static async list(): Promise<IAPINotification[]> {
    const ret = (await API.get)<IAPINotification[]>('/notification')

    return ret
  }

  public static async delete(id: number): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/notification/delete/${id}`)

    return ret
  }

  public static async deleteAll(): Promise<boolean> {
    const ret = (await API.delete)<boolean>(`/notification/delete`)

    return ret
  }
}
