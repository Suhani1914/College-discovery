import { useSearchParams, Link } from 'react-router-dom'
import { useCompareColleges } from '../hooks/useCompareColleges'
import CompareTable from '../components/CompareTable'

function ComparePage() {
  const [searchParams] = useSearchParams()
  const idsParam = searchParams.get('ids') ?? ''
  const ids = idsParam.split(',').filter(Boolean)

  const { data, isLoading, isError, error } = useCompareColleges(ids)

  if (ids.length < 2 || ids.length > 3) {
    return (
      <div className="min-h-screen bg-surface-muted p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <p className="text-text-muted text-sm">
            Select 2 or 3 colleges from the listing page to compare.
          </p>
          <Link to="/" className="text-primary text-sm hover:underline w-fit">
            ← Back to listing
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-surface-muted p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        <Link to="/" className="text-primary text-sm hover:underline w-fit">
          ← Back to listing
        </Link>

        <h1 className="text-2xl font-bold text-text">Compare Colleges</h1>

        {isLoading && (
          <p className="text-text-muted text-sm">Loading comparison...</p>
        )}

        {isError && (
          <p className="text-red-600 text-sm">
            {error instanceof Error ? error.message : 'Failed to load comparison'}
          </p>
        )}

        {data && data.data.length > 0 && <CompareTable colleges={data.data} />}

        {data && data.data.length === 0 && (
          <p className="text-text-muted text-sm">No colleges found for the given selection.</p>
        )}
      </div>
    </div>
  )
}

export default ComparePage