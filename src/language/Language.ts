/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

interface ILanguageOption {
  [key: string]: string
}

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

  public get(name: string, data: ILanguageOption = {}) {
    if (this.file === undefined) {
      console.error('[LANGUAGE::ERROR] file unknown')

      return `{${name}}`
    }
    if (!(name in this.file)) {
      console.error('[LANGUAGE::ERROR]', name)

      return `{${name}}`
    }

    let text = this.file[name]

    for (const k in data) {
      text = text.replace(`%${k}%`, data[k])
    }

    return text
  }

  public static getOrText(name: string, data: ILanguageOption = {}) {
    if (!(name in this.getInstance().file)) return name

    return this.getInstance().get(name, data)
  }

  public static get(name: string, data: ILanguageOption = {}) {
    return this.getInstance().get(name, data)
  }
}
