export type Category = 'General' | 'OBC' | 'SC' | 'ST'

export interface Course {
  id: string
  collegeId: string
  name: string
  duration: string
  fees: number
}

export interface Placement {
  id: string
  collegeId: string
  year: number
  avgPackage: number
  highestPackage: number
  placementRate: number
}

export interface Review {
  id: string
  collegeId: string
  author: string
  rating: number
  comment: string
  createdAt: string
}

export interface CutoffRecord {
  id: string
  collegeId: string
  exam: string
  category: Category
  closingRank: number
}

// GET /api/colleges — lean listing shape, no createdAt, no relations
export interface CollegeSummary {
  id: string
  name: string
  city: string
  state: string
  fees: number
  rating: number
}

// GET /api/colleges/:id — full detail with nested relations + createdAt
export interface CollegeDetail extends CollegeSummary {
  createdAt: string
  courses: Course[]
  placements: Placement[]
  reviews: Review[]
}

// GET /api/colleges/compare — summary + createdAt + only latest placement
export interface CollegeCompareItem extends CollegeSummary {
  createdAt: string
  placements: Placement[] // capped at 1 by backend (take: 1)
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface PredictorRequest {
  exam: string
  category: Category
  rank: number
}

export interface PredictorResultItem {
  college: CollegeSummary
  closingRank: number
}

export interface PredictorResponse {
  data: PredictorResultItem[]
  count: number
}

export interface CollegeListFilters {
  search?: string
  city?: string
  maxFees?: number
  minRating?: number
  page?: number
  limit?: number
}

export interface CompareResponse {
  data: CollegeCompareItem[]
}