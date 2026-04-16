import { useState, useEffect } from 'react';

interface AnalyticsEvent {
  type: 'pageview' | 'click' | 'scroll';
  path: string;
  timestamp: number;
  referrer?: string;
  customData?: Record<string, string>;
}

interface PageView {
  path: string;
  views: number;
  lastSeen: number;
}

interface AnalyticsData {
  pageViews: Record<string, PageView>;
  totalViews: number;
  topReferrers: Record<string, number>;
  topBrowsers: Record<string, number>;
}

const STORAGE_KEY = 'personal_website_analytics';
const MAX_EVENTS = 1000;

function getBrowser(): string {
  if (typeof window === 'undefined') return 'unknown';
  const ua = navigator.userAgent;
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Edge')) return 'Edge';
  return 'other';
}

function getReferrer(): string {
  if (typeof document === 'undefined') return 'direct';
  return document.referrer || 'direct';
}

export function useAnalytics() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const trackPageView = () => {
      const path = window.location.pathname;
      const timestamp = Date.now();
      const referrer = getReferrer();
      const browser = getBrowser();

      try {
        const existingData = localStorage.getItem(STORAGE_KEY);
        const data: AnalyticsData = existingData ? JSON.parse(existingData) : {
          pageViews: {},
          totalViews: 0,
          topReferrers: {},
          topBrowsers: {},
        };

        data.totalViews += 1;

        if (data.pageViews[path]) {
          data.pageViews[path].views += 1;
          data.pageViews[path].lastSeen = timestamp;
        } else {
          data.pageViews[path] = { path, views: 1, lastSeen: timestamp };
        }

        if (data.topReferrers[referrer]) {
          data.topReferrers[referrer] += 1;
        } else {
          data.topReferrers[referrer] = 1;
        }

        if (data.topBrowsers[browser]) {
          data.topBrowsers[browser] += 1;
        } else {
          data.topBrowsers[browser] = 1;
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('Analytics error:', e);
      }
    };

    trackPageView();
    setIsInitialized(true);
  }, []);

  return { isInitialized };
}

export function getAnalyticsData(): AnalyticsData | null {
  try {
    const existingData = localStorage.getItem(STORAGE_KEY);
    return existingData ? JSON.parse(existingData) : null;
  } catch {
    return null;
  }
}

export function clearAnalytics() {
  localStorage.removeItem(STORAGE_KEY);
}

export function exportAnalyticsAsJSON(): string {
  const data = getAnalyticsData();
  return data ? JSON.stringify(data, null, 2) : '{}';
}