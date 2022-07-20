import { adaptMiddleware } from '../adapters/adapt-middleware-express'
import { authMiddlewareFactory } from '../factories/middlewares/auth-controller-factory'

export const auth = adaptMiddleware(authMiddlewareFactory())
