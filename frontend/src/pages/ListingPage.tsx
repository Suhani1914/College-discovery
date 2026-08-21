import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useColleges } from '../hooks/useColleges'
import CollegeCard from '../components/CollegeCard'
import FilterBar from '../components/FilterBar'
import Pagination from '../components/Pagination'
import type { CollegeListFilters } from '../types/college'

const MAX_COMPARE = 3

function ListingPage() {
  const navigate = useNavigate()
  const [filters, setFilters] = useState<CollegeListFilters>({ page: 1, limit: 10 })
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { data, isLoading, isError, error, isPlaceholderData } = useColleges(filters)

  function toggleSelect(id: string) {
    setSelectedIds((prev) => {
      if (prev.includes(id)) return prev.filter((existingId) => existingId !== id)
      if (prev.length >= MAX_COMPARE) return prev
      return [...prev, id]
    })
  }

  function handleCompareClick() {
    navigate(`/compare?ids=${selectedIds.join(',')}`)
  }

  return (
    <div className="min-h-screen bg-surface-muted p-6 pb-24">
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-text">College Discovery</h1>

        <FilterBar
          filters={filters}
          onChange={setFilters}
        />

        {isLoading && (
          <p className="text-text-muted text-sm">Loading colleges...</p>
        )}

        {isError && (
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : 'Failed to load colleges'}
          </p>
        )}

        {data && (
          <>
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 transition-opacity ${
                isPlaceholderData ? 'opacity-50' : 'opacity-100'
              }`}
            >
              {data.data.map((college) => (
                <CollegeCard
                  key={college.id}
                  college={college}
                  isSelected={selectedIds.includes(college.id)}
                  onToggleSelect={toggleSelect}
                  selectionDisabled={selectedIds.length >= MAX_COMPARE}
                />
              ))}
            </div>

            {data.data.length === 0 && (
              <p className="text-text-muted text-sm">
                No colleges match your filters.
              </p>
            )}

            <Pagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
              onPageChange={(page) => setFilters((prev) => ({ ...prev, page }))}
            />
          </>
        )}
      </div>

      {selectedIds.length >= 2 && (
        <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border shadow-lg p-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <span className="text-sm text-text-muted">
              {selectedIds.length} college{selectedIds.length > 1 ? 's' : ''} selected
              {selectedIds.length === MAX_COMPARE && ' (max reached)'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedIds([])}
                className="px-3 py-1.5 text-sm text-text-muted border border-border rounded hover:bg-surface-muted transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleCompareClick}
                className="px-4 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors"
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListingPage