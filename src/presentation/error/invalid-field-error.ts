export class InvalidFieldError extends Error {
  constructor () {
    super('Username or password invalid')
    super.name = 'Invalid field error'
  }
}
