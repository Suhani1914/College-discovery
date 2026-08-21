import { Link } from 'react-router-dom'
import type { CollegeSummary } from '../types/college'

interface CollegeCardProps {
  college: CollegeSummary
  isSelected: boolean
  onToggleSelect: (id: string) => void
  selectionDisabled: boolean
}

function CollegeCard({
  college,
  isSelected,
  onToggleSelect,
  selectionDisabled,
}: CollegeCardProps) {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/colleges/${college.id}`}
          className="text-lg font-semibold text-primary hover:underline"
        >
          {college.name}
        </Link>
        <label className="flex items-center gap-1 text-sm text-text-muted shrink-0">
          <input
            type="checkbox"
            checked={isSelected}
            disabled={selectionDisabled && !isSelected}
            onChange={() => onToggleSelect(college.id)}
            className="accent-primary"
            aria-label={`Select ${college.name} for comparison`}
          />
          Compare
        </label>
      </div>

      <p className="text-sm text-text-muted">
        {college.city}, {college.state}
      </p>

      <div className="flex items-center justify-between mt-2 text-sm">
        <span className="text-text">
          ₹{college.fees.toLocaleString('en-IN')} / yr
        </span>
        <span className="inline-flex items-center gap-1 text-tertiary-dark font-medium">
          ★ {college.rating.toFixed(1)}
        </span>
      </div>
    </div>
  )
}

export default CollegeCard