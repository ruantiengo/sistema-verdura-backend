import { HashComparer } from '../../../src/data/protocols/hash-comparer'

export class HashComparerSpy implements HashComparer {
  compare (hashed: string, password: string): Promise<boolean> {
    return new Promise(resolve => resolve(true))
  }
}
