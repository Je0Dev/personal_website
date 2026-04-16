import { motion } from 'motion/react';
import { Home, ArrowRight, Search } from 'lucide-react';
import { CatHamburger } from '../components/CatHamburger';

export function NotFound({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-2xl mx-auto space-y-12 pt-20"
    >
{/* 404 ASCII Art */}
      <div className="flex justify-center">
        <CatHamburger size={150} />
      </div>

      <div className="text-center space-y-4">
        <h1 className="text-6xl sm:text-8xl font-display font-black text-[var(--text-color)]">
          404
        </h1>
        <p className="text-xl text-[var(--text-color)] opacity-70">
          Oops! The page you're looking for got lost in the matrix.
        </p>
        <p className="text-[var(--text-color)] opacity-50 font-mono text-sm">
          "The system is down. But don't worry, you can always go home."
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button 
          onClick={() => setActiveTab('home')}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[var(--accent-pink)] to-[var(--accent-purple)] hover:from-orange-500 hover:to-purple-600 border-b-[4px] border-black dark:border-white active:border-b-0 active:translate-y-1 hover:-translate-y-1 transition-all duration-150 shadow-lg"
        >
          <Home size={20} />
          <span className="font-black uppercase tracking-wider">Go Home</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('projects')}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold bg-[var(--card-bg)] text-[var(--text-color)] border-4 border-[var(--border-color)] brutal-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-none transition-all"
        >
          <Search size={20} />
          <span className="uppercase tracking-wider">Browse Projects</span>
        </button>
      </div>

      {/* Fun suggestion */}
      <div className="p-6 rounded-2xl bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow text-center">
        <p className="text-[var(--text-color)] opacity-80 font-medium mb-4">
          Looking for something specific?
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {['home', 'projects', 'hardware', 'notes', 'contact'].map((page) => (
            <button
              key={page}
              onClick={() => setActiveTab(page)}
              className="px-4 py-2 rounded-lg bg-[var(--bg-color)] border-2 border-[var(--border-color)] text-[var(--text-color)] font-bold uppercase text-sm hover:bg-[var(--accent-cyan)] hover:text-[#111] hover:border-[var(--accent-cyan)] transition-colors capitalize"
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
