// Animation variants - reusable and consistent

import { Variants } from 'motion/react';

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  },
};

// Page transitions
export const pageTransition: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

// Card hover
export const cardHover = {
  scale: 1.02,
  transition: { duration: 0.15 }
};

// Button press
export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};

// Loading spinner
export const spinner = {
  rotate: { rotate: 360 },
  transition: { duration: 1, repeat: Infinity, ease: "linear" }
};

// Pulse
export const pulse = {
  scale: [1, 1.1, 1],
  transition: { duration: 0.6, repeat: Infinity }
};

// Float
export const float = {
  y: [-5, 5, -5],
  transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
};

// Shake (for errors)
export const shake = {
  x: [-5, 5, -5, 5, 0],
  transition: { duration: 0.4 }
};

// Timing presets
export const timing = {
  fast: 0.15,
  normal: 0.3,
  slow: 0.5,
};

export const transitions = {
  spring: { type: 'spring', stiffness: 200, damping: 20 },
  ease: { ease: 'easeOut', duration: 0.3 },
};

export default {
  fadeIn,
  fadeInUp,
  fadeInDown,
  scaleIn,
  slideInLeft,
  slideInRight,
  stagger,
  pageTransition,
  cardHover,
  buttonTap,
  spinner,
  pulse,
  float,
  shake,
  timing,
  transitions,
};