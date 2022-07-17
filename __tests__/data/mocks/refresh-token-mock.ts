import { faker } from '@faker-js/faker'

export const refreshTokenMock = {
  expiresIn: 30,
  id: faker.datatype.uuid(),
  userId: faker.datatype.uuid()
}
