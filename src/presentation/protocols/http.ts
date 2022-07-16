export interface HttpRequest<T = any>{
    headers?: any
    body?: T
}
export interface HttpResponse{
    statusCode: number
    body?: any
}
