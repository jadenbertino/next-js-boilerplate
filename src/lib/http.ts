import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
} from 'axios'
import axiosRetry, { type IAxiosRetryConfig } from 'axios-retry'
import { z } from 'zod'
import { HttpError } from './error'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

type HttpConfig<T extends z.ZodType | undefined = undefined> =
  AxiosRequestConfig & {
    url: string
    method: HttpMethod
    responseSchema?: T
  }

type ConvenienceHttpConfig<T extends z.ZodType | undefined = undefined> = Omit<
  HttpConfig<T>,
  'method'
>

/**
 * Request client that provides HTTP methods with response validation.
 * Throws on axios or zod validation error.
 *
 * TODO: Clean up the implementation of this class, it's a bit messy
 */
class HttpClient {
  // public in case user wants to attach interceptors
  public axiosInstance: AxiosInstance

  constructor(axiosConfig?: CreateAxiosDefaults) {
    const axiosInstance = axios.create({
      timeout: 15 * 1000, // default to 15 second timeout
      ...axiosConfig,
    })
    attachRetryLogic(axiosInstance)
    this.axiosInstance = axiosInstance
  }

  /**
   * Makes request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async request<T extends z.ZodType>(config: HttpConfig<T>): Promise<z.infer<T>>
  async request(config: HttpConfig<undefined>): Promise<unknown>
  async request<T extends z.ZodType | undefined = undefined>({
    responseSchema,
    ...axiosConfig
  }: HttpConfig<T>): Promise<T extends z.ZodType ? z.infer<T> : unknown> {
    const res = await this.axiosInstance.request(axiosConfig)
    const schema = responseSchema ?? z.unknown()
    const validation = schema.safeParse(res.data)
    if (!validation.success) {
      throw new HttpError({
        statusCode: 500,
        message: `Response from ${axiosConfig.url} was not in the expected shape`,
        errorType: 'VALIDATION_ERROR',
        details: validation.error,
      })
    }
    return validation.data as T extends z.ZodType ? z.infer<T> : unknown
  }

  /**
   * Makes `GET` request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async get<T extends z.ZodType>(
    config: ConvenienceHttpConfig<T>,
  ): Promise<z.infer<T>>
  async get(config: ConvenienceHttpConfig<undefined>): Promise<unknown>
  async get<T extends z.ZodType | undefined = undefined>(
    config: ConvenienceHttpConfig<T>,
  ) {
    return this.request({ ...config, method: 'GET' })
  }

  /**
   * Makes `POST` request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async post<T extends z.ZodType>(
    config: ConvenienceHttpConfig<T>,
  ): Promise<z.infer<T>>
  async post(config: ConvenienceHttpConfig<undefined>): Promise<unknown>
  async post<T extends z.ZodType | undefined = undefined>(
    config: ConvenienceHttpConfig<T>,
  ) {
    return this.request({ ...config, method: 'POST' })
  }

  /**
   * Makes `PUT` request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async put<T extends z.ZodType>(
    config: ConvenienceHttpConfig<T>,
  ): Promise<z.infer<T>>
  async put(config: ConvenienceHttpConfig<undefined>): Promise<unknown>
  async put<T extends z.ZodType | undefined = undefined>(
    config: ConvenienceHttpConfig<T>,
  ) {
    return this.request({ ...config, method: 'PUT' })
  }

  /**
   * Makes `DELETE` request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async delete<T extends z.ZodType>(
    config: ConvenienceHttpConfig<T>,
  ): Promise<z.infer<T>>
  async delete(config: ConvenienceHttpConfig<undefined>): Promise<unknown>
  async delete<T extends z.ZodType | undefined = undefined>(
    config: ConvenienceHttpConfig<T>,
  ) {
    return this.request({ ...config, method: 'DELETE' })
  }

  /**
   * Makes `PATCH` request via the configured axios instance.
   * Validates response against `zod` schema.
   * Throws a `HttpError` on axios or zod validation failure.
   */
  async patch<T extends z.ZodType>(
    config: ConvenienceHttpConfig<T>,
  ): Promise<z.infer<T>>
  async patch(config: ConvenienceHttpConfig<undefined>): Promise<unknown>
  async patch<T extends z.ZodType | undefined = undefined>(
    config: ConvenienceHttpConfig<T>,
  ) {
    return this.request({ ...config, method: 'PATCH' })
  }
}

// Create default instance with retry logic for backwards compatibility
/**
 * Mutates the given `axiosInstance` to retry on errors.
 *
 * ⚠️ Throws `HttpError`, not `AxiosError`
 */
function attachRetryLogic(
  axiosInstance: AxiosInstance,
  retryConfig?: IAxiosRetryConfig,
): void {
  axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: (err) => {
      // You could potentially retry if 429 + POST but to be safe we'll skip it
      // Skip retry on non-idempotent requests (e.g. POST)
      if (!axiosRetry.isIdempotentRequestError(err)) {
        return false
      }

      // Retry on network errors (e.g. ECONNREFUSED)
      // or if the server failed to respond (status is undefined)
      const status = err.response?.status
      if (status === undefined || axiosRetry.isNetworkError(err)) {
        return true
      }

      // Skip retry on 4xx client errors (but retry on 429 Too Many Requests)
      const isClientError = status >= 400 && status !== 429 && status < 500
      if (isClientError) {
        return false
      }

      // Retry on server error
      const isServerError = status >= 500
      return isServerError
    },
    // onRetry: (retryCount, error, requestConfig) => {
    //   const url = requestConfig.url || 'unknown'
    //   const method = requestConfig.method?.toUpperCase() || 'unknown'
    //   const status = error.response?.status || 'network error'
    //   logger.debug(
    //     `🔄 Retrying ${method} ${url} (attempt ${retryCount}/3) - ${status}`,
    //   )
    // },
    ...retryConfig,
  })
}

const http = new HttpClient()

export { http, HttpClient }
