import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Colleges' },
  { to: '/predictor', label: 'Predictor' },
]

function NavBar() {
  return (
    <nav aria-label="Main navigation" className="bg-surface border-b border-border px-6 py-3">
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        <span className="font-bold text-primary">College Discovery</span>
        <div className="flex gap-4">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light rounded px-1 ${
                  isActive ? 'text-primary' : 'text-text-muted hover:text-text'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default NavBar