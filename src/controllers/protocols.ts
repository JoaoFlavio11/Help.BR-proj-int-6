export interface HttpResponse<T> {
  statusCode: number;
  body: T | T[] | string;
}

export interface HttpRequest<B = unknown> {
  params?: Record<string, unknown>;
  headers?: Record<string, unknown>;
  body?: Partial<B>;
}
