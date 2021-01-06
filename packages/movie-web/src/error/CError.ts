import Koa from 'koa'

export default class CError extends Error {
  public message: string
  public readonly locale: object
  public readonly code: number
  public readonly status: number
  public readonly detail: string
  constructor (locale: object, code: number, status: number = 500, detail?: string) {
    super()
    this.locale = locale
    this.code = code
    this.status = status
    this.detail = detail
  }

  public setMessage (request: Koa.Request): void {
    // default English
    this.message = this.locale['en-US']
    const language: string = request.headers['accept-language']
    if (language === undefined) return
    if (language.includes('zh')) {
      this.message = this.locale['zh-CN']
    } else if (language.includes('en')) {
      this.message = this.locale['en-US']
    } // else if other language
  }
}
