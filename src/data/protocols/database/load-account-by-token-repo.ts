import { Account } from '../../../domain/entities/account'

export interface LoadAccountById{
    loadAccountById(userId: string): Promise<Account>
}
