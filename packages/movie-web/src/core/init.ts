// inspired by https://github.com/LFB/nodejs-koa-blog
import Koa from 'koa'
import connect from './db'
import path from 'path'
import cors from '@koa/cors'
import { SwaggerRouter } from 'koa-swagger-decorator'
import config from '../config'
import CError from '../error/CError'
import logger from './log4js'
import koaBody from 'koa-body'
import { ApolloServer } from 'apollo-server-koa'
import { buildSchema } from 'type-graphql'
import MovieResolver from '../graphql/movie'

export default class InitManager {
  private static app: Koa<Koa.DefaultState, Koa.DefaultContext>
  public static initCore (app): void {
    InitManager.app = app
    ;(async () => {
      await InitManager.initLoadErrorHandler()
      await InitManager.initLoadDatabase()
      await InitManager.initLoadGraphQL()
      await InitManager.initLoadCORS()
      await InitManager.initLoadFileSupport()
      await InitManager.initLoadRouters()
      InitManager.app.listen(config.port, () => {
        console.log(`server listen at http://localhost:${config.port}`)
        console.log(`graphql listen at http://localhost:${config.port}/${config.graphqlPath}`)
        console.log(`swagger listen at http://localhost:${config.port}/swagger-html`)
      })
    })().catch(err => {
      console.error(err)
    })
  }

  private static async initLoadErrorHandler (): Promise<void> {
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

  public static async initLoadGraphQL (): Promise<void> {
    const schema = await buildSchema({
      resolvers: [MovieResolver]
    })
    const server = new ApolloServer({ schema })
    InitManager.app.use(server.getMiddleware())
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
