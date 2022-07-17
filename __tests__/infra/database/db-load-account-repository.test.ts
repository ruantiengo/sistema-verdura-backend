import { faker } from '@faker-js/faker'
import prisma from '../../../src/infra/database/prisma-postgres/client'

import { AccountPrisma } from '../../../src/infra/database/prisma-postgres/account-prisma'

const sut = new AccountPrisma()

describe('Load Account By Email', () => {
  it('Should load an account', async () => {
    const user = {
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName()
    }
    await prisma.user.create({ data: user })
    const account = await sut.loadByEmail(user.email)
    expect(account).toEqual(user)
    await prisma.user.delete({
      where: {
        email: user.email
      }
    })
  })
})
