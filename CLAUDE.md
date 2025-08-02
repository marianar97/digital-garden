# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based "Digital Garden" personal website that allows users to browse and contribute resources. The project uses modern web technologies including React 19, Vite, TypeScript, and Tailwind CSS with shadcn/ui components.

The main functionality includes:
- A hero section with animated text and a resource submission dialog
- A filterable resource grid displaying curated learning materials (videos, books, tools)
- Search, filter, and tag-based resource discovery
- Responsive design with mobile-first approach

## Development Commands

**Working Directory**: Always work from `/frontend/` subdirectory

**Package Manager**: Uses `pnpm` (required - Node.js 22+ required)

### Essential Commands
```bash
# Install dependencies
pnpm install

# Start development server (port 5173 by default)
pnpm dev

# Build for production
pnpm build

# Lint code (ESLint with TypeScript rules)
pnpm lint

# Preview production build
pnpm preview
```

### Build Process
- TypeScript compilation (`tsc -b`) followed by Vite build
- No test command configured - tests would need to be added

## Architecture & Key Patterns

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v3 + CSS custom properties for theming
- **UI Components**: shadcn/ui with Radix primitives
- **Animations**: GSAP for text animations, custom hover effects
- **Icons**: Lucide React

### Project Structure
```
frontend/src/
├── components/
│   ├── HeroTitle.tsx           # Main hero with form dialog
│   ├── Resources/              # Resource display components
│   │   ├── Resources.tsx       # Main container with data & filtering
│   │   ├── ResourceGrid.tsx    # Grid layout
│   │   └── ResourceCard.tsx    # Individual resource cards
│   ├── Search/                 # Filter & search components
│   ├── TextAnimations/         # GSAP-based animations
│   ├── magicui/               # Custom interactive components
│   └── ui/                    # shadcn/ui components
├── lib/utils.ts               # Tailwind utility helpers (cn function)
└── styles/globals.css         # Global styles + CSS variables
```

### Key Architectural Patterns

1. **Component Organization**: Features are grouped by domain (Resources, Search, TextAnimations)

2. **State Management**: Uses local React state - resources are filtered client-side from hardcoded data in `Resources.tsx:35-159`

3. **Styling System**: 
   - CSS custom properties for theming (`--primary`, `--background`, etc.)
   - Tailwind utility classes with shadcn/ui design tokens
   - `cn()` utility function for conditional class merging

4. **Type Safety**: Enums for `ResourceType` and `TagType`, interfaces for data structures

5. **Filtering Logic**: Multi-criteria filtering (type, search, tags) with AND-based tag matching

### shadcn/ui Configuration
- Path aliases configured: `@/components`, `@/lib/utils`, `@/components/ui`
- Uses TypeScript, Tailwind with CSS variables, Lucide icons
- Configuration in `components.json`

### Resource Data Structure
Resources are currently hardcoded arrays with:
- `id`, `title`, `description`, `image`, `url`
- `tags[]` (enum values for filtering)
- `type` (video/book/tool enum)

## Development Notes

- **Import Aliases**: Uses `@/` for `src/` directory (configured in Vite)
- **ESLint**: TypeScript ESLint with React hooks rules
- **CSS**: PostCSS with Autoprefixer for vendor prefixes
- **Assets**: Static assets in `public/` folder, referenced with `/filename.ext`