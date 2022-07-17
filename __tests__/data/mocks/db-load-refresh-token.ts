import { faker } from '@faker-js/faker'
import { LoadRefreshToken } from '../../../src/data/protocols/database/load-refresht-token'
import { RefreshTokenModel } from '../../../src/domain/entities/refresh-token'
import { fakeAccount } from './fake-account-mock'

export class LoadRefreshTokenSpy implements LoadRefreshToken {
  load (refreshToken: string): Promise<RefreshTokenModel> {
    return new Promise(resolve => resolve({
      expiresIn: 30,
      id: faker.datatype.uuid(),
      userId: fakeAccount?.id!
    }))
  }
}
