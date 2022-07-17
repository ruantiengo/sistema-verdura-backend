import jwt from 'jsonwebtoken'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'
export class JwtAdapter implements Encrypter {
  encrypt (argument: string, expiresIn: number): string {
    return jwt.sign({ id: argument }, process.env.JWT_SECRET!, {
      expiresIn
    })
  }
}
