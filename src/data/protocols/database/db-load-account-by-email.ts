import { Account } from '../../../domain/entities/account'

export interface DbLoadAccountByEmail{
    loadByEmail(email: string): Promise<Account>
}
