type HttpErrorArgs = {
  message: string
  details?: unknown
  statusCode: number
  [key: string]: unknown
}

class HttpError extends Error {
  details?: unknown
  statusCode: number;
  [key: string]: unknown

  constructor({
    message,
    details,
    statusCode,
    ...extraProperties
  }: HttpErrorArgs) {
    super(message)
    this.name = this.constructor.name // Ensure the name of this error is set as 'HttpError'
    this.details = details
    this.statusCode = statusCode
    Object.assign(this, extraProperties)
  }
}

class BadRequestError extends HttpError {
  constructor(error: HttpErrorArgs) {
    super(error)
  }
}

export { BadRequestError, HttpError }
