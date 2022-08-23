export class InvalidFieldError extends Error {
  constructor () {
    super('Username or password invalid')
    super.name = 'Username or password invalid'
  }
}
