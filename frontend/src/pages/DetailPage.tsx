import { useParams, Link } from 'react-router-dom'
import { useCollegeDetail } from '../hooks/useCollegeDetail'
import Skeleton from '../components/Skeleton'
import { ApiError } from '../api/client'

function DetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError, error, refetch } = useCollegeDetail(id)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-surface-muted p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-6">
          <Skeleton className="h-4 w-32" />
          <div className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-3">
            <Skeleton className="h-7 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
          </div>
          <div className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-3">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (isError) {
    const isNotFound = error instanceof ApiError && error.status === 404

    return (
      <div className="min-h-screen bg-surface-muted p-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-4">
          <Link to="/" className="text-primary text-sm hover:underline w-fit">
            ← Back to listing
          </Link>
          <div role="alert" className="bg-surface border border-red-200 rounded-lg p-6 flex flex-col items-start gap-3">
            <p className="text-red-600 text-sm font-medium">
              {isNotFound
                ? "This college doesn't exist or has been removed."
                : error instanceof Error
                  ? error.message
                  : 'Failed to load college'}
            </p>
            {!isNotFound && (
              <button
                onClick={() => refetch()}
                className="px-3 py-1.5 bg-primary text-white rounded text-sm hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="min-h-screen bg-surface-muted p-6">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <Link to="/" className="text-primary text-sm hover:underline w-fit">
          ← Back to listing
        </Link>

        <div className="bg-surface border border-border rounded-lg p-6">
          <h1 className="text-2xl font-bold text-text">{data.name}</h1>
          <p className="text-text-muted mt-1">
            {data.city}, {data.state}
          </p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <span>₹{data.fees.toLocaleString('en-IN')} / yr</span>
            <span className="inline-flex items-center gap-1 text-tertiary-dark font-medium">
              ★ {data.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text mb-3">Courses</h2>
          {data.courses.length === 0 ? (
            <p className="text-text-muted text-sm">No courses listed.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {data.courses.map((course) => (
                <div
                  key={course.id}
                  className="border border-border rounded p-3 text-sm flex flex-col gap-1"
                >
                  <span className="font-medium text-text">{course.name}</span>
                  <span className="text-text-muted">{course.duration}</span>
                  <span className="text-text-muted">
                    ₹{course.fees.toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text mb-3">Placements</h2>
          {data.placements.length === 0 ? (
            <p className="text-text-muted text-sm">No placement data available.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-text-muted border-b border-border">
                  <th className="py-2 font-medium">Year</th>
                  <th className="py-2 font-medium">Avg Package</th>
                  <th className="py-2 font-medium">Highest Package</th>
                  <th className="py-2 font-medium">Placement Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.placements.map((placement) => (
                  <tr key={placement.id} className="border-b border-border last:border-0">
                    <td className="py-2 text-text">{placement.year}</td>
                    <td className="py-2 text-text">
                      ₹{placement.avgPackage.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 text-text">
                      ₹{placement.highestPackage.toLocaleString('en-IN')}
                    </td>
                    <td className="py-2 text-text">{placement.placementRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="bg-surface border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold text-text mb-3">Reviews</h2>
          {data.reviews.length === 0 ? (
            <p className="text-text-muted text-sm">No reviews yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {data.reviews.map((review) => (
                <div key={review.id} className="border border-border rounded p-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-text">{review.author}</span>
                    <span className="inline-flex items-center gap-1 text-tertiary-dark">
                      ★ {review.rating}
                    </span>
                  </div>
                  <p className="text-text-muted mt-1">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default DetailPage