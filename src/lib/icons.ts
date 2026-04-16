// Icon utilities - standardized icon usage

import { LucideIcon, LucideProps } from 'lucide-react';
import * as Lucide from 'lucide-react';

// Re-export all lucide icons for convenience
export { Lucide };

// Icon categories for organization - using Lucide namespace
export const ICONS = {
  // Navigation
  home: Lucide.Home,
  projects: Lucide.FolderCode,
  hardware: Lucide.Cpu,
  notes: Lucide.FileText,
  contact: Lucide.Mail,
  
  // Social
  github: Lucide.Github,
  linkedin: Lucide.Linkedin,
  external: Lucide.ExternalLink,
  
  // UI
  sun: Lucide.Sun,
  moon: Lucide.Moon,
  search: Lucide.Search,
  menu: Lucide.Menu,
  close: Lucide.X,
  volumeOn: Lucide.Volume2,
  volumeOff: Lucide.VolumeX,
  globe: Lucide.Globe,
  
  // Actions
  arrowRight: Lucide.ArrowRight,
  chevronRight: Lucide.ChevronRight,
  chevronUp: Lucide.ChevronUp,
  chevronDown: Lucide.ChevronDown,
  send: Lucide.Send,
  copy: Lucide.Copy,
  refresh: Lucide.RefreshCw,
  link: Lucide.Link,
  
  // Content
  calendar: Lucide.Calendar,
  clock: Lucide.Clock,
  star: Lucide.Star,
  code: Lucide.Code2,
  fileCode: Lucide.FileCode,
  lightbulb: Lucide.Lightbulb,
  message: Lucide.MessageSquare,
  alert: Lucide.AlertCircle,
  check: Lucide.CheckCircle2,
  filter: Lucide.Filter,
  
  // Location
  mapPin: Lucide.MapPin,
  graduation: Lucide.GraduationCap,
  book: Lucide.BookOpen,
  
  // Tech tools
  terminal: Lucide.Terminal,
  database: Lucide.Database,
  server: Lucide.Server,
  wifi: Lucide.Wifi,
  cpu: Lucide.Cpu,
  hardDrive: Lucide.HardDrive,
  monitor: Lucide.Monitor,
  laptop: Lucide.Laptop,
  smartphone: Lucide.Smartphone,
  
  // Settings
  settings: Lucide.Settings,
  edit: Lucide.Pencil,
  delete: Lucide.Trash2,
  loading: Lucide.Loader2,
} as const;

// Type for icon names
export type IconName = keyof typeof ICONS;

// Get icon component by name
export function getIcon(name: IconName): LucideIcon {
  return ICONS[name] || Lucide.AlertCircle;
}

// Standard icon sizes
export const ICON_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
} as const;

// Standard icon props factory
export function createIconProps(
  size: keyof typeof ICON_SIZES = 'md',
  className = ''
): Partial<LucideProps> {
  return {
    size: ICON_SIZES[size],
    className,
  };
}

export default ICONS;