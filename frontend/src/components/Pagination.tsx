interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 mt-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1 text-sm border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-muted transition-colors"
      >
        Previous
      </button>
      <span className="text-sm text-text-muted">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1 text-sm border border-border rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-muted transition-colors"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination