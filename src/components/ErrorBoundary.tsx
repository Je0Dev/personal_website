import { Component, ReactNode } from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center min-h-[50vh] p-8 bg-[var(--card-bg)] border-4 border-[var(--border-color)]"
        >
          <div className="w-16 h-16 flex items-center justify-center bg-[var(--accent-red)] text-white mb-4">
            <AlertTriangle size={32} />
          </div>
          
          <h2 className="text-2xl font-display font-black text-[var(--text-color)] mb-2">
            Something went wrong
          </h2>
          
          <p className="text-sm text-[var(--text-color)] opacity-60 mb-4 max-w-md text-center">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--accent-cyan)] text-[#111] font-bold border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
          >
            <RefreshCw size={18} />
            Try Again
          </button>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

export function PageErrorFallback() {
  return (
    <ErrorBoundary>
      <div />
    </ErrorBoundary>
  );
}