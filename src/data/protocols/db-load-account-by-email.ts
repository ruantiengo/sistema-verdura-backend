import { Account } from '../../domain/entities/account'

export interface DbLoadAccountByEmail{
    load(email: string): Promise<Account>
}
