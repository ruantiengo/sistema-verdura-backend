export interface DbLoadCostumerByName{
    verify(name: string): Promise<boolean>
}
