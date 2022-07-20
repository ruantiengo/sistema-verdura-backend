import { PrismaClient, RefreshToken } from '@prisma/client'
import { DbLoadAccountByEmail } from '../../../data/protocols/database/db-load-account-by-email'
import { GenerateRefreshToken } from '../../../data/protocols/database/generate-refresh-token'
import { Account } from '../../../domain/entities/account'
import prisma from './client'
import dayjs from 'dayjs'
import { LoadRefreshToken } from '../../../data/protocols/database/load-refresht-token'
import { RefreshTokenModel } from '../../../domain/entities/refresh-token'
import { LoadAccountById } from '../../../data/protocols/database/load-account-by-token-repo'

export class AccountPrisma implements DbLoadAccountByEmail, GenerateRefreshToken, LoadRefreshToken, LoadAccountById {
  client: PrismaClient
  constructor () {
    this.client = prisma
  }

  async loadAccountById (userId: string): Promise<Account> {
    const account = await this.client.user.findFirst({
      where: {
        id: userId
      }
    })
    return account
  }

  async loadRefreshToken (refreshToken: string): Promise<RefreshTokenModel> {
    const loadRefreshToken = await this.client.refreshToken.findFirst({
      where: {
        id: refreshToken
      }
    })

    return loadRefreshToken
  }

  async generateRefreshToken (userId: string): Promise<RefreshToken> {
    const expiresIn = dayjs().add(15, 'second').unix()

    const getToken = await this.client.refreshToken.findFirst({
      where: {
        userId
      }
    })
    if (getToken) {
      this.client.refreshToken.update({
        where: {
          userId
        },
        data: {

          expiresIn
        }
      })
      return getToken
    }
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
