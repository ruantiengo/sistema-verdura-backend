import { faker } from '@faker-js/faker'
import prisma from '../../../../src/infra/database/prisma-postgres/client'

import { AccountPrisma } from '../../../../src/infra/database/prisma-postgres/account-prisma'

const sut = new AccountPrisma()

describe('Load Refresh Token', () => {
  const user = {
    id: faker.datatype.uuid(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.firstName()
  }
  beforeAll(async () => {
    await prisma.user.create({ data: user })
  })
  afterAll(async () => {
    await prisma.refreshToken.delete({
      where: {
        userId: user.id
      }
    })
    await prisma.user.delete({
      where: {
        id: user.id
      }
    })
  })
  it('Should return an refreshToken', async () => {
    const refreshToken = await sut.generateRefreshToken(user.id)
    const token = await sut.loadRefreshToken(refreshToken.id)
    expect(token?.id).toBeTruthy()
  })
})
