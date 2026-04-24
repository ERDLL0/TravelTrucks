# TravelTrucks

TravelTrucks is a campervan rental web application built with React and Redux Toolkit. It provides a structured way to browse, filter, and explore campervans with a focus on usability and predictable state management.

## Features
- Home page with hero section and automatic background slider
- Catalog page with paginated listing and load-more behavior
- Multi-criteria filtering system (location, form, engine, transmission, equipment)
- Camper detail page with gallery, specifications, and reviews
- Favorites system with persistent storage using Redux and localStorage
- Reservation form with basic validation and feedback
- Responsive layout across mobile, tablet, and desktop
- Loading and error handling for async operations

## Key Implementation Details

### Filtering System
- Filtering is handled through a dedicated Redux slice.
- Multiple filters can be applied together and the UI updates immediately based on state changes.
- The structure is designed to remain scalable as new filter types are introduced.

### Favorites System
- Favorites are stored in Redux and synchronized with localStorage.
- This ensures persistence across sessions while keeping UI state consistent.

### Data Handling
- API requests are handled with Axios
- Async logic is managed using Redux Toolkit thunks
- Loading and error states are explicitly controlled

## Tech Stack
- React
- Redux Toolkit
- React Router
- Axios
- Vite
- CSS Modules

## Project Structure
```text
src/
├── assets/
├── components/
│   ├── catalog/
│   └── common/
├── pages/
│   ├── Home/
│   ├── Catalog/
│   └── Detail/
├── redux/
│   ├── campers/
│   ├── filters/
│   └── favorites/
├── services/
└── styles/
```

## Getting Started

```bash
git clone https://github.com/ERDLL0/TravelTrucks
cd TravelTrucks
npm install
npm run dev
```

### Build
```bash
npm run build
```

## Design
The interface is intentionally kept clean and functional.

- Simple typography
- Neutral color palette
- Subtle transitions and hover states

Focus is placed on usability rather than visual complexity.

## Notes
- The project avoids external UI frameworks to maintain full control over styling and behavior.
- Filtering logic and state persistence were treated as core parts of the application architecture.

## Scope
This is a frontend-focused project, but the structure supports future expansion into a full-stack system.
Possible extensions include authentication, booking flow, and admin management tools.

## Author
Developed by Aslıhan ERDAL
