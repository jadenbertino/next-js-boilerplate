type HttpErrorArgs = {
  message: string
  details?: unknown
  statusCode: number
}

class HttpError extends Error {
  details?: unknown
  statusCode: number

  constructor({ message, details, statusCode }: HttpErrorArgs) {
    super(message)
    this.name = this.constructor.name // Ensure the name of this error is set as 'HttpError'
    this.details = details
    this.statusCode = statusCode
  }
}

class BadRequestError extends HttpError {
  constructor({ message, statusCode, details }: HttpErrorArgs) {
    super({ message, statusCode, details })
  }
}

export { BadRequestError, HttpError }
