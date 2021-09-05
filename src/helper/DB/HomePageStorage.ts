import DB from '../DB'

const slug = 'activeHomePage'

export default class HomePageStorage extends DB {
  public static async get() {
    const active = await this.getItem(slug)

    return parseInt(active ?? '0', 10)
  }

  public static async set(active: number | string) {
    await this.setItem(slug, active.toString())
  }
}
