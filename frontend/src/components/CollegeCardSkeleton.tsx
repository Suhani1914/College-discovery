import Skeleton from './Skeleton'

function CollegeCardSkeleton() {
  return (
    <div className="bg-surface border border-border rounded-lg p-4 flex flex-col gap-2">
      <div className="flex items-start justify-between gap-2">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-14" />
      </div>
      <Skeleton className="h-4 w-1/2" />
      <div className="flex items-center justify-between mt-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}

export default CollegeCardSkeleton