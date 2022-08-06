/* eslint-disable camelcase */
import { AddCostumer } from '../../../domain/usecases/add-costumer'
import { MissingParamError } from '../../error'
import { badRequest, ok, serverError } from '../../helpers/status-code'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class RegisterClientController implements Controller {
  constructor (private readonly addCostumer: AddCostumer) {
    this.addCostumer = addCostumer
  }

  async handle (request: HttpRequest<any>): Promise<HttpResponse> {
    const { name, phone, type, cpf_cnpj, address, note } = request.body
    try {
      const requiredFields = ['name']
      for (const field of requiredFields) {
        if (request.body[field] === undefined) return badRequest(new MissingParamError(field))
      }
      const res = await this.addCostumer.add({ name, phone, type, cpf_cnpj, address, note })
      if (!res) return badRequest(new Error())
      return ok(res)
    } catch (error) {
      console.log(error)

      return serverError()
    }
  }
}
