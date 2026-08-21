import { useState } from 'react'
import type { CollegeListFilters } from '../types/college'

interface FilterBarProps {
  filters: CollegeListFilters
  onChange: (filters: CollegeListFilters) => void
}

function FilterBar({ filters, onChange }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(filters.search ?? '')

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault()
    onChange({ ...filters, search: searchInput || undefined, page: 1 })
  }

  function handleSearchInputChange(value: string) {
    setSearchInput(value)
    if (value === '' && filters.search !== undefined) {
      onChange({ ...filters, search: undefined, page: 1 })
    }
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-wrap gap-3 items-end">
      <form
        onSubmit={handleSearchSubmit}
        role="search"
        aria-label="Search colleges by name"
        className="flex gap-2 flex-1 min-w-[200px]"
      >
        <label htmlFor="college-search" className="sr-only">
          Search by college name
        </label>
        <input
          id="college-search"
          type="text"
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          placeholder="Search by college name..."
          className="flex-1 border border-border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light"
        >
          Search
        </button>
      </form>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-city" className="text-xs text-text-muted">
          City
        </label>
        <input
          id="filter-city"
          type="text"
          value={filters.city ?? ''}
          onChange={(e) =>
            onChange({ ...filters, city: e.target.value || undefined, page: 1 })
          }
          placeholder="Any city"
          className="border border-border rounded px-2 py-1 text-sm w-32 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-max-fees" className="text-xs text-text-muted">
          Max Fees
        </label>
        <input
          id="filter-max-fees"
          type="number"
          value={filters.maxFees ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              maxFees: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          placeholder="Any"
          className="border border-border rounded px-2 py-1 text-sm w-28 focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="filter-min-rating" className="text-xs text-text-muted">
          Min Rating
        </label>
        <select
          id="filter-min-rating"
          value={filters.minRating ?? ''}
          onChange={(e) =>
            onChange({
              ...filters,
              minRating: e.target.value ? Number(e.target.value) : undefined,
              page: 1,
            })
          }
          className="border border-border rounded px-2 py-1 text-sm w-24 focus:outline-none focus:ring-2 focus:ring-primary-light"
        >
          <option value="">Any</option>
          <option value="3">3+</option>
          <option value="3.5">3.5+</option>
          <option value="4">4+</option>
          <option value="4.5">4.5+</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar