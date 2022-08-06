import { Costumer } from '../entities/costumer'

export interface AddCostumer{
    add(addCostumerParams: Omit<Costumer, 'id'>): Promise<boolean>
}
