export class MissingParamError extends Error {
  constructor (field: string) {
    super(`Error: missing field ${field}.`)
    super.name = 'Missing Field Error'
  }
}
