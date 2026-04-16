import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, Clock, Globe, Monitor, Trash2, Download, X, ArrowRight } from 'lucide-react';
import { getAnalyticsData, clearAnalytics, exportAnalyticsAsJSON } from '../lib/analytics';

interface AnalyticsDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AnalyticsDashboard({ isOpen, onClose }: AnalyticsDashboardProps) {
  const [data, setData] = useState<ReturnType<typeof getAnalyticsData> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setData(getAnalyticsData());
    }
  }, [isOpen]);

  const handleExport = () => {
    const json = exportAnalyticsAsJSON();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (confirm('Clear all analytics data?')) {
      clearAnalytics();
      setData(getAnalyticsData());
    }
  };

  if (!isOpen) return null;

  const sortedPages = data ? Object.values(data.pageViews).sort((a, b) => b.views - a.views) : [];
  const topBrowser = data ? Object.entries(data.topBrowsers).sort((a, b) => b[1] - a[1])[0] : null;
  const topReferrer = data ? Object.entries(data.topReferrers).sort((a, b) => b[1] - a[1])[0] : null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl max-h-[80vh] overflow-y-auto bg-[var(--card-bg)] border-4 border-[var(--border-color)] brutal-shadow-lg p-6"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-display font-black text-[var(--text-color)] uppercase">Analytics</h2>
            <button onClick={onClose} className="p-2 hover:bg-[var(--accent-pink)] hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          {data && data.totalViews > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="p-4 bg-[var(--bg-color)] border-2 border-[var(--border-color)]">
                  <Eye size={20} className="text-[var(--accent-pink)] mb-2" />
                  <p className="text-2xl font-black text-[var(--text-color)]">{data.totalViews}</p>
                  <p className="text-xs font-bold text-[var(--text-color)] opacity-60 uppercase">Total Views</p>
                </div>
                <div className="p-4 bg-[var(--bg-color)] border-2 border-[var(--border-color)]">
                  <Globe size={20} className="text-[var(--accent-cyan)] mb-2" />
                  <p className="text-2xl font-black text-[var(--text-color)]">{Object.keys(data.pageViews).length}</p>
                  <p className="text-xs font-bold text-[var(--text-color)] opacity-60 uppercase">Pages</p>
                </div>
                <div className="p-4 bg-[var(--bg-color)] border-2 border-[var(--border-color)]">
                  <Monitor size={20} className="text-[var(--accent-yellow)] mb-2" />
                  <p className="text-2xl font-black text-[var(--text-color)]">{topBrowser?.[0] || 'N/A'}</p>
                  <p className="text-xs font-bold text-[var(--text-color)] opacity-60 uppercase">Top Browser</p>
                </div>
                <div className="p-4 bg-[var(--bg-color)] border-2 border-[var(--border-color)]">
                  <Clock size={20} className="text-[var(--accent-green)] mb-2" />
                  <p className="text-lg font-black text-[var(--text-color)] truncate">
                    {sortedPages[0]?.path || '/'}
                  </p>
                  <p className="text-xs font-bold text-[var(--text-color)] opacity-60 uppercase">Last Viewed</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-black text-[var(--text-color)] uppercase">Top Pages</h3>
                <div className="space-y-2">
                  {sortedPages.slice(0, 10).map((page, i) => (
                    <motion.div
                      key={page.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center gap-4 p-3 bg-[var(--bg-color)] border-2 border-[var(--border-color)]"
                    >
                      <span className="text-sm font-black text-[var(--accent-pink)] w-6">{i + 1}</span>
                      <span className="flex-1 font-medium text-[var(--text-color)] truncate">{page.path}</span>
                      <span className="font-black text-[var(--text-color)]">{page.views}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleExport}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent-cyan)] text-[#111] font-black uppercase border-2 border-[var(--border-color)] hover:translate-y-[-2px] transition-transform"
                >
                  <Download size={18} />
                  Export JSON
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-[var(--accent-pink)] text-white font-black uppercase border-2 border-[var(--border-color)] hover:translate-y-[-2px] transition-transform"
                >
                  <Trash2 size={18} />
                  Clear
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-[var(--text-color)] opacity-60">No analytics data yet</p>
              <p className="text-sm text-[var(--text-color)] opacity-40 mt-2">Visit pages to start tracking</p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}