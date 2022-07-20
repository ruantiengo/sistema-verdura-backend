export class PasswordConfirmationError extends Error {
  constructor () {
    super()
    super.name = 'Password are not iquals'
  }
}
