// model Client {
//     id        Int      @id @default(autoincrement())
//     name      String  @db.VarChar(50)
//     phone     String @db.VarChar(50)
//     type      String @db.VarChar(50) // fisico ou juridico
//     cpf_cnpj  String @db.VarChar(50)
//     address   Address?
//     note      String @db.VarChar(255)
//   }
export type Costumer = {
    id: number
    name: string
    phone: string
    type: string
    cpf_cnpj: string
    address: {
        number: string,
        district: string,
        city: string,
        state: string
    }
    note: string
}
