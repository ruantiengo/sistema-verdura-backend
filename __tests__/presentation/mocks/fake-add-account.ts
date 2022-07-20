import { faker } from '@faker-js/faker'
const password = faker.internet.password()

export const fakeAddAccount = {
  name: faker.name.firstName(),
  email: faker.internet.email(),
  password,
  passwordConfirmation: password
}
