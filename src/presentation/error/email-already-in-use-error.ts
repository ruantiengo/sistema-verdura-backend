export class EmailAlreadyInUse extends Error {
  constructor () {
    super('Email already in use')
    super.name = 'Email Already In Use'
  }
}
