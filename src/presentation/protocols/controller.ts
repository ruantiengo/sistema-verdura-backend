import { HttpRequest, HttpResponse } from './http'

export interface Controller<T= any>{
    handle(request: HttpRequest<T>): Promise<HttpResponse>
}
