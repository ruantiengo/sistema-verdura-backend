import { Costumer } from '../../domain/entities/costumer'
import { AddCostumer } from '../../domain/usecases/add-costumer'
import { DbLoadCostumerByName } from '../protocols/database/db-load-costumer-by-name'
import { DbSaveCostumer } from '../protocols/database/save-costumer'

export class DbAddCostumer implements AddCostumer {
  constructor (private readonly loadCostumerByName: DbLoadCostumerByName, private readonly saveCostumer: DbSaveCostumer) {
    this.loadCostumerByName = loadCostumerByName
    this.saveCostumer = saveCostumer
  }

  async add (addClientParams: Costumer): Promise<boolean> {
    const costumerAlreadyExists = await this.loadCostumerByName.verify(addClientParams.name)

    if (costumerAlreadyExists) return false
    const res = await this.saveCostumer.save(addClientParams)
    console.log(res)

    return res
  }
}
