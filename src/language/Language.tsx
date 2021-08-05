export default class Language {
  private static instance: Language

  private lang: string = 'en'

  private file: any

  public static getInstance(): Language {
    if (!this.instance) {
      this.instance = new Language()
    }

    return this.instance
  }

  private Language() {}

  public init(lang: 'de' | 'en'): void {
    this.lang = lang

    if (lang === 'de') {
      this.file = require('./de.json')
    } else if (lang === 'en') {
      this.file = require('./en.json')
    }
  }

  public get(name: string) {
    return this.file[name]
  }

  public static get(name: string) {
    return this.getInstance().get(name)
  }
}
