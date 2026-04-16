import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'card' | 'avatar' | 'image' | 'list';
}

export function Skeleton({ className = '', variant = 'text' }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-[var(--bg-tertiary)] relative overflow-hidden';
  
  const variants = {
    text: 'h-4 rounded',
    card: 'rounded-xl border-2 border-[var(--border-color)]',
    avatar: 'rounded-full',
    image: 'rounded-lg aspect-video',
    list: 'h-12 rounded-lg',
  };

  return (
    <div className={`${baseClasses} ${variants[variant]} ${className}`}>
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          animation: 'shimmer 1.5s infinite',
        }}
      />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="p-4 rounded-xl border-2 border-[var(--border-color)] bg-[var(--card-bg)]">
      <Skeleton variant="image" className="mb-4" />
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="w-1/2" />
    </div>
  );
}

export function ListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 p-3 rounded-lg border-2 border-[var(--border-color)] bg-[var(--card-bg)]"
        >
          <Skeleton variant="avatar" className="w-10 h-10" />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" className="w-1/3" />
            <Skeleton variant="text" className="w-1/2" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="max-w-5xl space-y-12 animate-pulse">
      <div className="space-y-4">
        <Skeleton variant="text" className="w-1/4 h-8" />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-2/3" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  );
}