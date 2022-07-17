import { PrismaClient, RefreshToken } from '@prisma/client'
import { DbLoadAccountByEmail } from '../../../data/protocols/database/db-load-account-by-email'
import { GenerateRefreshToken } from '../../../data/protocols/database/generate-refresh-token'
import { Account } from '../../../domain/entities/account'
import prisma from './client'
import dayjs from 'dayjs'

export class AccountPrisma implements DbLoadAccountByEmail, GenerateRefreshToken {
  client: PrismaClient
  constructor () {
    this.client = prisma
  }

  async generateRefreshToken (userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'second').unix()
    const newToken = await this.client.refreshToken.create({
      data: {
        userId,
        expiresIn
      }
    })

    return newToken
  }

  async loadByEmail (email: string): Promise<Account> {
    const user = await this.client.user.findFirst({
      where: {
        email
      }
    })
    return user
  }
}
