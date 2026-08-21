import { useQuery } from '@tanstack/react-query'
import { getColleges } from '../api/colleges'
import type { CollegeListFilters } from '../types/college'

export function useColleges(filters: CollegeListFilters) {
  return useQuery({
    queryKey: ['colleges', filters],
    queryFn: () => getColleges(filters),
    placeholderData: (previousData) => previousData, // keeps old page visible during pagination fetch
  })
}