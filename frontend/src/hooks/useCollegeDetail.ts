import { useQuery } from '@tanstack/react-query'
import { getCollegeById } from '../api/colleges'

export function useCollegeDetail(id: string | undefined) {
  return useQuery({
    queryKey: ['college', id],
    queryFn: () => getCollegeById(id!),
    enabled: !!id, // don't fire until id is actually available
  })
}