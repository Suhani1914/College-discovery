import { apiFetch } from './client'
import type {
  CollegeSummary,
  CollegeDetail,
  PaginatedResponse,
  CollegeListFilters,
  CompareResponse,
} from '../types/college'

export function getColleges(
  filters: CollegeListFilters
): Promise<PaginatedResponse<CollegeSummary>> {
  const params = new URLSearchParams()

  if (filters.search) params.set('search', filters.search)
  if (filters.city) params.set('city', filters.city)
  if (filters.maxFees !== undefined) params.set('maxFees', String(filters.maxFees))
  if (filters.minRating !== undefined) params.set('minRating', String(filters.minRating))
  params.set('page', String(filters.page ?? 1))
  params.set('limit', String(filters.limit ?? 10))

  return apiFetch(`/colleges?${params.toString()}`)
}

export function getCollegeById(id: string): Promise<CollegeDetail> {
  return apiFetch(`/colleges/${id}`)
}

export function compareColleges(ids: string[]): Promise<CompareResponse> {
  if (ids.length < 2 || ids.length > 3) {
    throw new Error('compareColleges requires 2 or 3 ids')
  }
  return apiFetch(`/colleges/compare?ids=${ids.join(',')}`)
}   