if (typeof window !== 'undefined') {
  throw new Error('This file should not be imported in the browser')
}

export * from './handleErrors'
export * from './parse'
