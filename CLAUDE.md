# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack "Digital Garden" personal website that allows users to browse and contribute resources. The project consists of a React frontend and Python Flask backend with Firebase Firestore database.

The main functionality includes:
- A hero section with animated text and a resource submission dialog
- A filterable resource grid displaying curated learning materials (videos, articles, books, tools)
- Search, filter, and tag-based resource discovery
- Backend API for creating and retrieving resources with automatic link previews
- Responsive design with mobile-first approach

## Development Commands

### Frontend Commands
**Working Directory**: Always work from `/frontend/` subdirectory
**Package Manager**: Uses `pnpm` (required - Node.js 22+ required)

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

### Backend Commands
**Working Directory**: Always work from `/backend/` subdirectory
**Python Version**: Requires Python 3.8+

```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start development server (port 3001 by default)
python app.py

# Production server with Gunicorn
gunicorn -w 4 -b 0.0.0.0:3001 app:app
```

### Build Process
- **Frontend**: TypeScript compilation (`tsc -b`) followed by Vite build
- **Backend**: No build process required - Python runs directly
- No test commands configured - tests would need to be added

## Architecture & Key Patterns

### Tech Stack
- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: Python Flask + Flask-CORS
- **Database**: Firebase Firestore
- **External APIs**: LinkPreview.net for automatic link metadata
- **Styling**: Tailwind CSS v3 + CSS custom properties for theming
- **UI Components**: shadcn/ui with Radix primitives
- **Animations**: GSAP for text animations, custom hover effects
- **Icons**: Lucide React

### Project Structure
```
├── frontend/src/
│   ├── components/
│   │   ├── HeroTitle.tsx           # Main hero with form dialog
│   │   ├── Resources/              # Resource display components
│   │   │   ├── Resources.tsx       # Main container with data & filtering
│   │   │   ├── ResourceGrid.tsx    # Grid layout
│   │   │   └── ResourceCard.tsx    # Individual resource cards
│   │   ├── Search/                 # Filter & search components
│   │   ├── TextAnimations/         # GSAP-based animations
│   │   ├── magicui/               # Custom interactive components
│   │   └── ui/                    # shadcn/ui components
│   ├── services/
│   │   └── api.ts                 # Frontend API service layer
│   ├── lib/utils.ts               # Tailwind utility helpers (cn function)
│   └── styles/globals.css         # Global styles + CSS variables
└── backend/
    ├── app.py                     # Flask application entry point
    ├── requirements.txt           # Python dependencies
    └── services/
        ├── __init__.py
        ├── firebase_config.py     # Firebase initialization
        ├── firestore_service.py   # Firestore database operations
        └── link_preview_service.py # Link metadata extraction
```

### Key Architectural Patterns

1. **Component Organization**: Features are grouped by domain (Resources, Search, TextAnimations)

2. **API Layer**: 
   - Backend Flask REST API with `/api/resources` endpoints
   - Frontend API service class in `frontend/src/services/api.ts`
   - Type-safe interfaces for API communication

3. **Database Architecture**:
   - Firebase Firestore for persistent resource storage
   - Service layer pattern with `FirestoreService` class
   - Automatic timestamps and document ID generation

4. **External Services**:
   - LinkPreview.net integration for automatic metadata extraction
   - Graceful fallback when link previews fail

5. **State Management**: Uses local React state with API data fetching

6. **Styling System**: 
   - CSS custom properties for theming (`--primary`, `--background`, etc.)
   - Tailwind utility classes with shadcn/ui design tokens
   - `cn()` utility function for conditional class merging

7. **Type Safety**: Enums for `ResourceType` and `TagType`, interfaces for data structures

8. **Filtering Logic**: Multi-criteria filtering (type, search, tags) with AND-based tag matching

### shadcn/ui Configuration
- Path aliases configured: `@/components`, `@/lib/utils`, `@/components/ui`
- Uses TypeScript, Tailwind with CSS variables, Lucide icons
- Configuration in `components.json`

### Backend API Endpoints

#### POST /api/resources
Creates a new resource with automatic link preview extraction.

**Request Body:**
```json
{
  "title": "string (required)",
  "type": "Video|Article|Book|Tool (required)", 
  "url": "string (required)",
  "tags": ["string"] // optional array
}
```

**Response:** Returns created resource with generated `id`, `createdAt`, `updatedAt`, and auto-fetched `description`/`image` from link preview.

#### GET /api/resources
Returns all resources from Firestore.

#### GET /health
Health check endpoint.

### Resource Data Structure
Resources stored in Firestore with:
- `id` (auto-generated)
- `title`, `type`, `url` (required fields)
- `description`, `image` (auto-fetched from LinkPreview API)
- `tags[]` (optional array of strings)
- `createdAt`, `updatedAt` (auto-generated timestamps)

## Development Notes

### Frontend
- **Import Aliases**: Uses `@/` for `src/` directory (configured in Vite)
- **ESLint**: TypeScript ESLint with React hooks rules
- **CSS**: PostCSS with Autoprefixer for vendor prefixes
- **Assets**: Static assets in `public/` folder, referenced with `/filename.ext`

### Backend
- **Environment Variables**: Uses `.env` file for configuration
  - `FIREBASE_PROJECT_ID`, `FIREBASE_PRIVATE_KEY`, `FIREBASE_CLIENT_EMAIL` (required)
  - `LINKPREVIEW_API_KEY` (optional - for link metadata)
  - `FRONTEND_URL` (CORS configuration, defaults to `*`)
  - `PORT` (server port, defaults to 3001)
- **CORS**: Configured for cross-origin requests from frontend
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Validation**: Input validation for all API endpoints

### Dependencies
- **Frontend**: React 19, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Flask 3.1.1, Flask-CORS 6.0.1, firebase-admin 7.1.0, requests 2.32.4, python-dotenv 1.1.1, gunicorn 23.0.0