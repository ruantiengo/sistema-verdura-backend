import { faker } from '@faker-js/faker'
import { Account } from '../../../src/domain/entities/account'
export const fakeAccount: Account = {
  email: faker.internet.email(),
  id: faker.datatype.uuid(),
  name: faker.name.firstName(),
  password: faker.internet.password() // hashedpassword
}
