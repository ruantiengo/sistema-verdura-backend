import { Decrypter } from '../../../src/data/protocols/cryptography/decrypter'
import { Encrypter } from '../../../src/data/protocols/cryptography/encrypter'

export class EncrypterSpy implements Encrypter, Decrypter {
  decrypt (argument: string): string | null {
    return 'password'
  }

  encrypt (argument: string, timeToExpire: number): string {
    return 'hashed-password'
  }
}
