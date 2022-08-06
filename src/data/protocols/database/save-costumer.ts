import { Costumer } from '../../../domain/entities/costumer'

export interface DbSaveCostumer{
    save(costumerParam: Omit<Costumer, 'id'>): Promise<boolean>
}
