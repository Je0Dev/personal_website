# Agent Guidelines

## Code Standards
- **Maximum file length: 150 lines** - All new files and existing files must be refactored to stay under 150 lines
- Split large components into smaller, focused pieces
- Extract data to separate data files in `src/data/`
- Extract custom hooks to `src/hooks/`
- Use composition over large monolithic components

## Refactoring Rules
- When creating a new component, keep it focused and under 150 lines
- If a file exceeds 150 lines, split into:
  - Main component file
  - Sub-components in same directory
  - Data files for static data
  - Utility functions in `src/lib/`

## Naming Conventions
- Components: PascalCase (e.g., `HeroSection.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useTypedText.ts`)
- Data: camelCase (e.g., `homeData.ts`)
- Utils: camelCase (e.g., `utils.ts`)

## Import Organization
```typescript
// 1. React/External imports
import { useState } from 'react';
import { motion } from 'motion/react';

// 2. Internal components
import { HeroSection } from './components/home/HeroSection';

// 3. Data imports
import { skillsData } from './data/homeData';

// 4. Hooks imports
import { useTypedText } from './hooks/useTypedText';

// 5. Utils imports
import { cn } from './lib/utils';
```

## Build Requirements
- All files must pass TypeScript strict mode
- Build must succeed without errors
- No unused imports or variables
- Follow existing code patterns and styling conventions