import DB from '../DB'

const slug = 'redishoppany'

export default class TokenStorage extends DB {
  public static async getToken(): Promise<string> {
    const token = await this.getItem(`${slug}-token`)

    return token ?? ''
  }

  public static async getEmail(): Promise<string> {
    const email = await this.getItem(`${slug}-email`)

    return email ?? ''
  }

  public static async get(): Promise<{
    email: string
    token: string
    empty: boolean
  }> {
    const email = await this.getEmail()
    const token = await this.getToken()
    const empty = token !== '' && email !== ''

    return { email, token, empty }
  }

  public static async exists(): Promise<boolean> {
    const { empty } = await this.get()

    return empty
  }

  public static async setEmail(email: string) {
    await this.setItem(`${slug}-email`, email)
  }

  public static async setToken(token: string) {
    await this.setItem(`${slug}-token`, token)
  }

  public static async set(email: string, token: string) {
    await this.setEmail(email)
    await this.setToken(token)
  }

  public static async clear() {
    await this.set('', '')
  }
}
