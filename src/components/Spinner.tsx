import { motion } from 'motion/react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  color?: string;
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
};

export function Spinner({ size = 'md', className = '', color = 'var(--accent-pink)' }: SpinnerProps) {
  return (
    <motion.div
      className={`${sizes[size]} border-2 border-[var(--border-color)] border-t-transparent ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      style={{ borderTopColor: color }}
    />
  );
}

export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--bg-color)]/90 backdrop-blur-sm"
    >
      <Spinner size="lg" className="mb-4" />
      <p className="text-sm font-mono text-[var(--text-color)] opacity-60">{message}</p>
    </motion.div>
  );
}

export function ButtonSpinner({ className = '' }: { className?: string }) {
  return (
    <motion.div
      className={`w-4 h-4 border-2 border-current border-t-transparent rounded-full ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
    />
  );
}

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-[50vh]"
    >
      <motion.div
        className="flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-[var(--accent-pink)]"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </motion.div>
      <p className="mt-4 text-sm font-mono text-[var(--text-color)] opacity-50">Loading...</p>
    </motion.div>
  );
}