import { HashComparer } from '../../data/protocols/cryptography/hash-comparer'
import bcrypt from 'bcrypt'
import { Hasher } from '../../data/protocols/cryptography/hasher'
export class BCryptAdapter implements HashComparer, Hasher {
  async hash (hash: string): Promise<string> {
    const hashed = await bcrypt.hash(hash, 12)
    return hashed
  }

  async compare (hashed: string, password: string): Promise<boolean> {
    const stringMatch = await bcrypt.compare(password, hashed)
    return stringMatch
  }
}
