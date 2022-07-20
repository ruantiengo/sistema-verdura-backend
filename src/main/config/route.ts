import { Router } from 'express'
import loginRouter from '../router/login-router'
export default (router: Router) => {
  loginRouter(router)
}
