import { NextRequest } from 'next/server'
import queryString from 'query-string'
import { z } from 'zod'
import { BadRequestError } from '../error'
import { serialize } from '../logs/shared'

/**
 * Parses the request body into a JSON object and validates it against a Zod schema
 */
async function validateRequestBody<T>(
  req: NextRequest,
  schema: z.ZodType<T>,
): Promise<T> {
  // Parse request body into JSON
  let body: unknown
  try {
    body = await req.json()
  } catch (error) {
    throw new BadRequestError({
      statusCode: 400,
      message: `Request body is not valid JSON`,
      details: {
        // don't log received, as it's a readable stream
        error: serialize(error),
      },
    })
  }

  // Validate request JSON against zod schema
  const validation = schema.safeParse(body)
  if (!validation.success) {
    throw new BadRequestError({
      statusCode: 400,
      message: `Invalid request body: ${validation.error.message}`,
    })
  }
  return validation.data
}

function validateQueryParams<T>({
  req,
  parseOptions,
  schema,
}: {
  req: NextRequest
  parseOptions?: queryString.ParseOptions
  schema: z.ZodType<T>
}): T {
  // Convert query params to object
  const params = req.nextUrl.searchParams.toString()
  const parsedQueryParams = queryString.parse(params, parseOptions)

  // Validate against zod schema
  const validation = schema.safeParse(parsedQueryParams)
  if (!validation.success) {
    throw new BadRequestError({
      statusCode: 400,
      message: 'Invalid query parameters',
      details: {
        error: validation.error.message,
      },
    })
  }
  return validation.data
}

export { validateRequestBody as getRequestBody, validateQueryParams }
