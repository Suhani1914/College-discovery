import { usePredictor } from '../hooks/usePredictor'
import PredictorForm from '../components/PredictorForm'

function PredictorPage() {
  const { mutate, data, isPending, isError, error } = usePredictor()

  return (
    <div className="min-h-screen bg-surface-muted p-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-text">College Predictor</h1>
        <p className="text-text-muted text-sm -mt-4">
          Enter your exam, category, and rank to see colleges you're likely to get into.
        </p>

        <PredictorForm onSubmit={mutate} isPending={isPending} />

        {isError && (
          <div className="bg-surface border border-red-200 rounded-lg p-6">
            <p className="text-red-600 text-sm font-medium">
              {error instanceof Error ? error.message : 'Prediction failed'}
            </p>
          </div>
        )}

        {data && (
          <div className="bg-surface border border-border rounded-lg p-6">
            <h2 className="text-lg font-semibold text-text mb-3">
              {data.count} match{data.count !== 1 ? 'es' : ''} found
            </h2>

            {data.data.length === 0 ? (
              <p className="text-text-muted text-sm">
                No colleges found for this rank/category/exam combination.
              </p>
            ) : (
              <div className="flex flex-col gap-2">
                {data.data.map((item) => (
                  <div
                    key={item.college.id}
                    className="border border-border rounded p-3 flex items-center justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium text-text">{item.college.name}</span>
                      <span className="text-text-muted ml-2">
                        {item.college.city}, {item.college.state}
                      </span>
                    </div>
                    <span className="text-text-muted">
                      Closing rank: {item.closingRank.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default PredictorPage