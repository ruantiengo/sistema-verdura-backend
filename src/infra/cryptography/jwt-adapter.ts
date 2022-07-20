import jwt from 'jsonwebtoken'
import { Decrypter } from '../../data/protocols/cryptography/decrypter'
import { Encrypter } from '../../data/protocols/cryptography/encrypter'
export class JwtAdapter implements Encrypter, Decrypter {
  decrypt (argument: string): string | null {
    const token = argument.replace('Bearer ', '')

    const teste = jwt.verify(token, process.env.JWT_SECRET!, (err, decode) => {
      if (err) return null

      return decode
    }) as any

    return teste?.id || null
  }

  encrypt (argument: string, expiresIn: number): string {
    return jwt.sign({ id: argument }, process.env.JWT_SECRET!, {
      expiresIn
    })
  }
}
