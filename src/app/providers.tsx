'use client'

import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { type ReactNode } from 'react'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    // onError: (error) => {
    // Sentry.captureException(error)
    // },
  }),
  mutationCache: new MutationCache({
    // onError: (error) => {
    // Sentry.captureException(error)
    // },
  }),
})

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  )
}

export { Providers }
