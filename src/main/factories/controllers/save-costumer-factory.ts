import { DbAddCostumer } from '../../../data/usecases/db-add-costumer'
import { AccountPrisma } from '../../../infra/database/prisma-postgres/account-prisma'
import { RegisterClientController } from '../../../presentation/controllers/costumer/register-costumer-controller'

export const AddCostumerControllerFactory = () => {
  const prismaAccount = new AccountPrisma()
  const addCostumer = new DbAddCostumer(prismaAccount, prismaAccount)
  const controller = new RegisterClientController(addCostumer)
  return controller
}
