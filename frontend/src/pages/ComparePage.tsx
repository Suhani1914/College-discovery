import { useSearchParams, Link } from 'react-router-dom'
import { useCompareColleges } from '../hooks/useCompareColleges'
import CompareTable from '../components/CompareTable'
import Skeleton from '../components/Skeleton'

function ComparePage() {
  const [searchParams] = useSearchParams()
  const idsParam = searchParams.get('ids') ?? ''
  const ids = idsParam.split(',').filter(Boolean)

  const { data, isLoading, isError, error, refetch } = useCompareColleges(ids)

  if (ids.length < 2 || ids.length > 3) {
    return (
      <div className="min-h-screen bg-surface-muted p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <p className="text-text-muted text-sm">
              Select 2 or 3 colleges from the listing page to compare.
            </p>
          </div>
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
          <div className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-3">
            <div className="flex gap-4">
              {ids.map((id) => (
                <Skeleton key={id} className="h-6 flex-1" />
              ))}
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        )}

        {isError && (
          <div role="alert" className="bg-surface border border-red-200 rounded-lg p-6 flex flex-col items-start gap-3">
            <p className="text-red-600 text-sm font-medium">
              {error instanceof Error ? error.message : 'Failed to load comparison'}
            </p>
            <button
              onClick={() => refetch()}
              className="px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {data && data.data.length > 0 && <CompareTable colleges={data.data} />}

        {data && data.data.length === 0 && (
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <p className="text-text-muted text-sm">
              No colleges found for the given selection.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ComparePage