import { DbAddAccount } from '../../../data/usecases/db-add-account'
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { AccountPrisma } from '../../../infra/database/prisma-postgres/account-prisma'

export const addAccountFactory = () => {
  const addAccount = new AccountPrisma()
  const hasher = new BCryptAdapter()
  const usecase = new DbAddAccount(addAccount, hasher)

  return usecase
}
