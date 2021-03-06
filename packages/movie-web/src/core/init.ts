// inspired by https://github.com/LFB/nodejs-koa-blog
import connect from './db'
import path from 'path'
import cors from '@koa/cors'
import { SwaggerRouter } from 'koa-swagger-decorator'
import config from '../config'
import CError from '../error/CError'
import logger from './log4js'
import koaBody from 'koa-body'

export default class InitManager {
  private static app: any
  public static initCore (app): void {
    InitManager.app = app
    ;(async () => {
      await InitManager.initLoadErrorHandler()
      await InitManager.initLoadDatabase()
      await InitManager.initLoadCORS()
      await InitManager.initLoadFileSupport()
      await InitManager.initLoadRouters()
      InitManager.app.listen(config.port, () => {
        console.log(`listen at http://localhost:${config.port}`)
        console.log(`swagger at http://localhost:${config.port}/swagger-html`)
      })
    })().catch(err => {
      console.error(err)
    })
  }

  public static async initLoadErrorHandler (): Promise<void> {
    InitManager.app.use(async (ctx, next) => {
      try {
        ctx.auth = ctx.request.header.authorization
        await next()
      } catch (error) {
        if (error instanceof CError) {
          error.setMessage(ctx.request)
          ctx.body = {
            message: error.message,
            code: error.code,
            detail: error.detail
          }
          ctx.status = error.status
        } else {
          logger.error(error)
          ctx.body = error.message
          ctx.status = 500
        }
      }
    })
  }

  public static async initLoadDatabase (): Promise<void> {
    try {
      await connect
      console.log('Connection has been established successfully.')
    } catch (err) {
      console.error('Unable to connect to the database:', err)
    }
  }

  private static async initLoadCORS (): Promise<void> {
    InitManager.app.use(cors({
      origin: ctx => {
        const allowedOrigins: string[] = config.cors.allowedOrigins
        if (allowedOrigins.some(origin => {
          return ctx.request.header.origin.includes(origin)
        })) {
          return ctx.request.header.origin
        }
      },
      keepHeadersOnError: false
    }
    ))
  }

  private static async initLoadFileSupport (): Promise<void> {
    InitManager.app.use(koaBody({
      multipart: true,
      formidable: {
        keepExtensions: true,
        maxFileSize: 10 * 1024 * 1024,
        uploadDir: path.resolve(__dirname, '../../static/')
      }
    }))
  }

  private static async initLoadRouters (): Promise<void> {
    const router = new SwaggerRouter()
    router.swagger({
      title: 'Movie Paradise API V1 Server',
      description: 'Movie Paradise API DOC',
      version: process.env.npm_package_version
    })
    router.mapDir(path.resolve(__dirname, '../controller/'))
    InitManager.app.use(router.routes())
    console.log('Routes loaded.')
  }
}
