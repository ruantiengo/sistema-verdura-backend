import { Encrypter } from '../../../src/data/protocols/encrypter'

export class EncrypterSpy implements Encrypter {
  encrypt (argument: string): Promise<string> {
    return new Promise(resolve => resolve('hashed-password'))
  }
}
