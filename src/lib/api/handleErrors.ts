import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { BadRequestError } from '../error'
import { clientLogger } from '../logs/client'
import { serialize } from '../logs/shared'

type RouteHandler = (
  req: NextRequest,
  context?: unknown,
) => Promise<NextResponse>

/**
 * @example
 * ```ts
 * export const GET = handleErrors(async (req: NextRequest) => {
 *   return NextResponse.json({
 *     status: 'ok',
 *   })1
 * })
 */
function handleErrors(handler: RouteHandler): RouteHandler {
  return async (req, context) => {
    try {
      // Execute the actual route handler
      return await handler(req, context)
    } catch (error: unknown) {
      const { privateMessage, publicMessage, statusCode } =
        getErrorDetails(error)

      // Capture error internally
      const apiRoute = req.nextUrl.pathname
      const meta = {
        apiRoute,
        method: req.method,
        error: serialize(error),
        ...(context ? { context } : {}),
      }

      // send to sentry
      // captureException(error, {
      //   extra: meta,
      // })

      clientLogger.error(
        `Error caught in API Route at '${apiRoute}': ${privateMessage}`,
        meta,
      )

      // Respond with error
      return NextResponse.json(
        {
          message: publicMessage,
        },
        { status: statusCode },
      )
    }
  }
}

const ErrorSchema = z
  .object({
    message: z.string(),
    statusCode: z.number(),
  })
  .partial()

function getErrorDetails(err: unknown) {
  const publicMessage =
    err instanceof BadRequestError ? err.message : 'Internal Server Error'
  let privateMessage = 'Internal Server Error'
  let statusCode = 500
  const validation = ErrorSchema.safeParse(err)
  if (validation.success) {
    privateMessage = validation.data.message ?? 'Internal Server Error'
    statusCode = validation.data.statusCode ?? 500
  }
  return {
    privateMessage,
    publicMessage,
    statusCode,
  }
}

export { handleErrors }
