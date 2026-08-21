import type { CollegeCompareItem } from '../types/college'

interface CompareTableProps {
  colleges: CollegeCompareItem[]
}

function CompareTable({ colleges }: CompareTableProps) {
  const latestPlacement = (college: CollegeCompareItem) => college.placements[0]

  const rows: Array<{
    label: string
    render: (college: CollegeCompareItem) => React.ReactNode
  }> = [
    { label: 'City', render: (c) => `${c.city}, ${c.state}` },
    { label: 'Fees / yr', render: (c) => `₹${c.fees.toLocaleString('en-IN')}` },
    { label: 'Rating', render: (c) => `★ ${c.rating.toFixed(1)}` },
    {
      label: 'Latest Avg Package',
      render: (c) => {
        const p = latestPlacement(c)
        return p ? `₹${p.avgPackage.toLocaleString('en-IN')} (${p.year})` : '—'
      },
    },
    {
      label: 'Latest Highest Package',
      render: (c) => {
        const p = latestPlacement(c)
        return p ? `₹${p.highestPackage.toLocaleString('en-IN')}` : '—'
      },
    },
    {
      label: 'Latest Placement Rate',
      render: (c) => {
        const p = latestPlacement(c)
        return p ? `${p.placementRate}%` : '—'
      },
    },
  ]

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm bg-surface border border-border rounded-lg">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left p-3 text-text-muted font-medium w-40">Metric</th>
            {colleges.map((college) => (
              <th key={college.id} className="text-left p-3 text-text font-semibold">
                {college.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-border last:border-0">
              <td className="p-3 text-text-muted font-medium">{row.label}</td>
              {colleges.map((college) => (
                <td key={college.id} className="p-3 text-text">
                  {row.render(college)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default CompareTable