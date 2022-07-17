import { HashComparer } from '../../../src/data/protocols/cryptography/hash-comparer'

export class HashComparerSpy implements HashComparer {
  compare (hashed: string, password: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}
