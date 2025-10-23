import { serializeError } from 'serialize-error'
import serializeJavascript, {
  type SerializeJSOptions,
} from 'serialize-javascript'

/**
 * Serialize any JavaScript value to a string representation.
 *
 * Advantages over JSON.stringify:
 * - Handles Error objects with full stack traces and properties
 * - Supports undefined, NaN, Infinity, Date, RegExp, Map, Set, BigInt
 * - Handles circular references without throwing
 * - Produces valid JavaScript (can be eval'd to reconstruct original value)
 *
 * Use cases: logging, debugging, server-side rendering, passing complex data to client
 */
function serialize(value: unknown): string {
  const options: SerializeJSOptions = {
    unsafe: true, // Disable XSS protection for readability
  }

  if (value instanceof Error) {
    return serializeJavascript(serializeError(value), options)
  }
  return serializeJavascript(value, options)
}

export { serialize }
