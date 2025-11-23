import { queryOptions, useQuery, type QueryKey } from '@tanstack/react-query'

const QUERY_KEYS = {
  all: ['repos'],
} as const satisfies Record<string, QueryKey>

const QUERY_OPTIONS = {
  all: () =>
    queryOptions({
      queryKey: QUERY_KEYS.all,
      queryFn: () => ['example repo'],
    }),
} as const

const useRepos = () => {
  return useQuery(QUERY_OPTIONS.all())
}

export { useRepos }
