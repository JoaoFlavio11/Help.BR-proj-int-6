export interface HttpResponse<T> {
  statusCode: number;
  body: T | T[] | string;
}

export interface HttpRequest<b>{
  params?:any;
  headers?:any;
  body?:any;
}