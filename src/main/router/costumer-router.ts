import { Router } from 'express'
import { adaptRout } from '../adapters/adapt-route-express'
import { AddCostumerControllerFactory } from '../factories/controllers/save-costumer-factory'
import { auth } from '../middlewares/auth'

export default (route: Router) => {
  route.post('/costumer', auth, adaptRout(AddCostumerControllerFactory()))
}
