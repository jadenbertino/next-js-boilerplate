import { z } from 'zod'
import { CLIENT_ENV } from './client'

const ServerEnvSchema = z.object({
  // add server env vars here
})

function validateServerEnv() {
  // validate the environment variables
  const validation = ServerEnvSchema.safeParse(process.env)
  if (!validation.success) {
    throw new Error(validation.error.message)
  }
  return validation.data
}

const SERVER_ENV = {
  ...CLIENT_ENV, // all client env vars are also available on the server
  ...validateServerEnv(),
}

export { SERVER_ENV }
