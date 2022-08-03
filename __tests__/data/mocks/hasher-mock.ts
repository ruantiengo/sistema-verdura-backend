import { Hasher } from '../../../src/data/protocols/cryptography/hasher'

export class HasherSpy implements Hasher {
  hash (hash: string): Promise<string> {
    return new Promise(resolve => resolve('hashed'))
  }
}
