import { Component } from 'react'
import type { ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // In production, wire this to an error-reporting service instead of console
    console.error('Uncaught error in component tree:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface-muted flex items-center justify-center p-6">
          <div className="bg-surface border border-border rounded-lg p-8 max-w-md text-center flex flex-col gap-4">
            <h1 className="text-xl font-bold text-text">Something went wrong</h1>
            <p className="text-text-muted text-sm">
              An unexpected error occurred. Try reloading the page.
            </p>
            <button
              onClick={() => {
                this.handleReset()
                window.location.href = '/'
              }}
              className="bg-primary text-white rounded px-4 py-2 text-sm hover:bg-primary-dark transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary