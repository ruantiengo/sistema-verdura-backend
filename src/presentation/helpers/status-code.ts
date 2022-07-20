import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const forbbiden = (error: Error): HttpResponse => {
  return {
    statusCode: 403,
    body: error
  }
}

export const ok = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body: {
      ...body
    }
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500

  }
}
