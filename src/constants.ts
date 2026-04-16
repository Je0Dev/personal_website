// Site Constants - extracted hardcoded values

// Social Links
export const SOCIAL_LINKS = {
  github: { label: 'GitHub', url: 'https://github.com/Je0Dev' },
  gitlab: { label: 'GitLab', url: 'https://gitlab.com/mag30-admin' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/in/geomas/' },
  email: { label: 'Email', url: 'mailto:giorgos_M000@hotmail.com' },
} as const;

// Contact
export const CONTACT = {
  email: 'giorgos_M000@hotmail.com',
  subject: 'New portfolio message from',
} as const;

// Toast Messages
export const TOAST_MESSAGES = {
  welcome: "ECE Student @ University of Patras | Building software and hardware",
  copied: 'Copied to clipboard!',
  saved: 'Changes saved!',
  error: 'Something went wrong',
} as const;

// Animation Durations
export const ANIMATION = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
} as const;

// Scroll
export const SCROLL_OPTIONS = {
  headerOffset: 80,
  behavior: 'smooth' as const,
} as const;

// Lazy Load Thresholds
export const LAZY_LOAD = {
  rootMargin: '50px',
  threshold: 0.1,
} as const;

// Pagination
export const PAGINATION = {
  projectsPerPage: 6,
  notesPerPage: 5,
  loadMoreCount: 4,
} as const;

// SEO
export const SEO = {
  title: "George's Portfolio",
  description: 'ECE Student | Software & Hardware Developer',
  author: 'George Mastrogiannis',
  keywords: ['portfolio', 'ECE', 'developer', 'software', 'hardware'],
} as const;

// Analytics (placeholder for future)
export const ANALYTICS = {
  enabled: false,
  // Add GA4 or Plausible ID when ready
} as const;

// Feature Flags
export const FEATURES = {
  pwa: true,
  sound: true,
  i18n: true,
  fontSelector: true,
  tableOfContents: true,
  quickActions: true,
} as const;

// Accessibility
export const A11Y = {
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
  highContrast: '(prefers-contrast: more)',
} as const;

// Export all as const for type safety
export const SITE = {
  SOCIAL_LINKS,
  CONTACT,
  TOAST_MESSAGES,
  ANIMATION,
  SCROLL_OPTIONS,
  LAZY_LOAD,
  PAGINATION,
  SEO,
  ANALYTICS,
  FEATURES,
  A11Y,
} as const;