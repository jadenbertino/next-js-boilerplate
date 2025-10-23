import { serialize } from './shared'

const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const
type LogLevel = (typeof LOG_LEVELS)[number]
const LOG_LEVEL: LogLevel = 'info'

type LogMethod = (message: string, data?: object | unknown) => void

const clientLogger: Record<LogLevel, LogMethod> = {
  debug: createLogMethod('debug'),
  info: createLogMethod('info'),
  warn: createLogMethod('warn'),
  error: createLogMethod('error'),
}

function createLogMethod(level: LogLevel): LogMethod {
  return (message: string, data?: object | unknown) => {
    const shouldLog = LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(LOG_LEVEL)
    if (shouldLog) {
      console.log(
        `[${level.toUpperCase()}] ${message}`,
        data ? serialize(data) : '',
      )
    }
  }
}

export { clientLogger }
