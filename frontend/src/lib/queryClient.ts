import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,       // 1 min — colleges/predictor data doesn't change often
      retry: 1,                    // fail fast in dev, avoid silent hangs on real errors
      refetchOnWindowFocus: false, // avoid surprise refetches during demo/interview
    },
  },
})