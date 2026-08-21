interface SkeletonProps {
  className?: string
}

function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-border rounded ${className}`}
      aria-hidden="true"
    />
  )
}

export default Skeleton