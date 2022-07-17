import { HashComparer } from '../../data/protocols/cryptography/hash-comparer'
import bcrypt from 'bcrypt'
export class BCryptAdapter implements HashComparer {
  async compare (hashed: string, password: string): Promise<boolean> {
    const stringMatch = await bcrypt.compare(password, hashed)
    return stringMatch
  }
}
