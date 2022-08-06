import { SignUpController } from '../../../presentation/controllers/login/signup-controller'
import { addAccountFactory } from '../data/add-account-usecase-factory'

export const signUpControllerFactory = () => {
  const addAccount = addAccountFactory()
  const controller = new SignUpController(addAccount)
  return controller
}
