import { motion } from 'motion/react';

interface PageLoaderProps {
  text?: string;
}

const shimmer = {
  background: 'linear-gradient(90deg, var(--bg-color) 25%, var(--border-color) 50%, var(--bg-color) 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
};

export function PageLoader({ text = 'Loading...' }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[var(--border-color)] border-t-[var(--accent-pink)]"
        style={{ borderRadius: 0 }}
      />
      <p className="text-sm font-mono text-[var(--text-color)] opacity-60">{text}</p>
      
      {/* Skeleton dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            className="w-2 h-2 bg-[var(--accent-cyan)]"
          />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-[var(--card-bg)] border-4 border-[var(--border-color)] p-4" style={{ borderRadius: 0 }}>
      <motion.div 
        animate={shimmer}
        className="h-32 bg-[var(--border-color)] mb-4"
      />
      <motion.div 
        animate={shimmer}
        className="h-6 bg-[var(--border-color)] w-3/4 mb-2"
      />
      <motion.div 
        animate={shimmer}
        className="h-4 bg-[var(--border-color)] w-1/2 mb-4"
      />
      <div className="flex gap-2">
        <motion.div animate={shimmer} className="h-6 w-16 bg-[var(--border-color)]" />
        <motion.div animate={shimmer} className="h-6 w-20 bg-[var(--border-color)]" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="space-y-8">
      <motion.div animate={shimmer} className="h-16 w-3/4 bg-[var(--border-color)]" />
      <motion.div animate={shimmer} className="h-8 w-1/2 bg-[var(--border-color)]" />
      <motion.div animate={shimmer} className="h-20 w-full bg-[var(--border-color)]" />
      <div className="flex gap-4">
        <motion.div animate={shimmer} className="h-14 w-40 bg-[var(--border-color)]" />
        <motion.div animate={shimmer} className="h-14 w-32 bg-[var(--border-color)]" />
      </div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-4 p-4 bg-[var(--card-bg)] border-4 border-[var(--border-color)]"
          style={{ borderRadius: 0 }}
        >
          <motion.div animate={shimmer} className="w-20 h-20 bg-[var(--border-color)]" />
          <div className="flex-1 space-y-2">
            <motion.div animate={shimmer} className="h-5 w-3/4 bg-[var(--border-color)]" />
            <motion.div animate={shimmer} className="h-4 w-1/2 bg-[var(--border-color)]" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}