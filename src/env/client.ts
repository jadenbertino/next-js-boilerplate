import { z } from 'zod'

const ClientEnvSchema = z.object({
  // TODO: Add client env vars here
  // Must be prefixed with NEXT_PUBLIC_
  // NEXT_PUBLIC_ENVIRONMENT: z.enum(['development', 'staging', 'production']),
})
type ClientEnvKey = keyof z.infer<typeof ClientEnvSchema>

function validateClientEnv() {
  // get the environment variables
  const rawClientEnv: Record<ClientEnvKey, string | undefined> = {
    // after parsing, we strip the NEXT_PUBLIC_ prefix so that they are easier to access
    // however when accessing the environment variables directly,
    // we have to use the NEXT_PUBLIC_ prefix so that Next.js can inline them
    NEXT_PUBLIC_ENVIRONMENT: process.env['NEXT_PUBLIC_ENVIRONMENT'],
  }

  // validate the environment variables
  const validation = ClientEnvSchema.safeParse(rawClientEnv)
  if (!validation.success) {
    throw new Error(
      validation.error.message +
        '\n' +
        '💡 process.env: ' +
        JSON.stringify(rawClientEnv, null, 2),
    )
  }

  // strip the NEXT_PUBLIC_ prefix
  // const env = validation.data
  return {
    // ENVIRONMENT: env.NEXT_PUBLIC_ENVIRONMENT,
  }
}

const CLIENT_ENV = validateClientEnv()

export { CLIENT_ENV }
