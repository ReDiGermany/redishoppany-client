/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
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
    this.file = require('./en.json')

    let temp
    if (lang === 'de') temp = require('./de.json')
    if (temp) {
      for (const k in temp) {
        this.file[k] = temp[k]
      }
    }
  }

  public get(name: string) {
    if (this.file === undefined) {
      console.error('[LANGUAGE::ERROR] file unknown')

      return `{${name}}`
    }
    if (!(name in this.file)) {
      console.error('[LANGUAGE::ERROR]', name)

      return `{${name}}`
    }

    return this.file[name]
  }

  public static get(name: string) {
    return this.getInstance().get(name)
  }
}
