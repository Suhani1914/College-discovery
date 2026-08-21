import { useQuery } from '@tanstack/react-query'
import { compareColleges } from '../api/colleges'

export function useCompareColleges(ids: string[]) {
  return useQuery({
    queryKey: ['compare', ids],
    queryFn: () => compareColleges(ids),
    enabled: ids.length >= 2 && ids.length <= 3,
  })
}