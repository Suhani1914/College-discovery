import { useState } from 'react'
import type { Category, PredictorRequest } from '../types/college'

interface PredictorFormProps {
  onSubmit: (payload: PredictorRequest) => void
  isPending: boolean
}

const CATEGORIES: Category[] = ['General', 'OBC', 'SC', 'ST']

function PredictorForm({ onSubmit, isPending }: PredictorFormProps) {
  const [exam, setExam] = useState('')
  const [category, setCategory] = useState<Category>('General')
  const [rank, setRank] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsedRank = Number(rank)
    if (!exam || !parsedRank || parsedRank <= 0) return
    onSubmit({ exam, category, rank: parsedRank })
  }

  const isValid = exam.trim().length > 0 && Number(rank) > 0

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-border rounded-lg p-6 flex flex-col gap-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Exam</label>
        <input
          type="text"
          value={exam}
          onChange={(e) => setExam(e.target.value)}
          placeholder="e.g. JEE, BITSAT, State-CET"
          className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-text">Your Rank</label>
        <input
          type="number"
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          placeholder="e.g. 15000"
          min={1}
          className="border border-border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-light"
        />
      </div>

      <button
        type="submit"
        disabled={!isValid || isPending}
        className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {isPending ? 'Predicting...' : 'Predict Colleges'}
      </button>
    </form>
  )
}

export default PredictorForm