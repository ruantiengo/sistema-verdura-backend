import { PrismaClient, RefreshToken } from '@prisma/client'
import { DbLoadAccountByEmail } from '../../../data/protocols/database/db-load-account-by-email'
import { GenerateRefreshToken } from '../../../data/protocols/database/generate-refresh-token'
import { Account } from '../../../domain/entities/account'
import prisma from './client'
import dayjs from 'dayjs'
import { LoadRefreshToken } from '../../../data/protocols/database/load-refresht-token'
import { RefreshTokenModel } from '../../../domain/entities/refresh-token'
import { LoadAccountById } from '../../../data/protocols/database/load-account-by-token-repo'
import { AddAccount } from '../../../domain/usecases/add-account'
import { SignUp } from '../../../types/sign-up'
import { DbLoadCostumerByName } from '../../../data/protocols/database/db-load-costumer-by-name'
import { DbSaveCostumer } from '../../../data/protocols/database/save-costumer'
import { Costumer } from '../../../domain/entities/costumer'

export class AccountPrisma implements DbSaveCostumer, DbLoadCostumerByName, DbLoadAccountByEmail, GenerateRefreshToken, LoadRefreshToken, LoadAccountById, AddAccount {
  client: PrismaClient
  constructor () {
    this.client = prisma
  }

  async save (costumerParam: Omit<Costumer, 'id'>): Promise<boolean> {
    const res = await this.client.costumer.create({
      data: {
        cpf_cnpj: costumerParam.cpf_cnpj,
        name: costumerParam.name,
        note: costumerParam.note,
        phone: costumerParam.phone,
        type: costumerParam.type
      }
    })
    if (costumerParam.address !== undefined) {
      await this.client.address.create({
        data: {
          ...costumerParam.address,
          clientId: res.id
        }
      })
    }
    if (!res) return false
    return true
  }

  async verify (name: string): Promise<boolean> {
    const res = await this.client.costumer.findFirst({
      where: {
        name
      }
    })
    if (!res) return false
    return true
  }

  async add (addAccountParams: Omit<SignUp.Params, 'passwordConfirmation'>): Promise<boolean> {
    const alreadyExist = await this.client.user.findFirst({
      where: {
        email: addAccountParams.email
      }
    })
    if (alreadyExist) return false
    await this.client.user.create({ data: addAccountParams })
    return true
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
