import { Router } from 'express'
import { adaptRout } from '../adapters/adapt-route-express'
import { loginControllerFactory } from '../factories/controllers/login-controller-factory'
import { refreshTokenControllerFactory } from '../factories/controllers/refresh-token'
import { auth } from '../middlewares/auth'

export default (router: Router) => {
  router.post('/login', adaptRout(loginControllerFactory()))
  router.post('/refresh-token', adaptRout(refreshTokenControllerFactory()))
  router.get('/teste', auth, (req, res) => {
    res.json('hello world')
  })
}
