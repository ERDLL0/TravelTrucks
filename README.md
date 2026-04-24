# TravelTrucks 🚐

A premium campervan rental web application built with **React**, **Redux Toolkit**, and **Vite**.

TravelTrucks allows users to browse, filter, and book campervans from a curated fleet. It features a full catalog with advanced filters, a detailed camper view with photo galleries, user reviews, and a reservation form — all backed by a live REST API.

---

## ✨ Key Features

- **🏠 Home Page:**
  - Engaging hero section with an automatic crossfade background slider (transitions every 10 seconds).
  - Clear "View Now" Call-To-Action leading directly to the catalog.
- **📋 Catalog Page:**
  - Paginated list of campervans with a "Load more" functionality.
  - Side-by-side desktop layout and an animated full-screen drawer for mobile devices.
- **🔍 Advanced Filtering:**
  - Filter by location (text input).
  - Filter by camper form (Alcove, Panel Van, Integrated, etc.).
  - Filter by engine type and transmission.
  - Filter by vehicle equipment (AC, Kitchen, TV, Bathroom, Microwave, Water, etc.).
- **❤️ Favorites System:**
  - Users can save their favorite campervans.
  - Interactive "Favorites" dropdown in the main navigation header to view and manage saved vehicles.
  - Persists across page refreshes using Redux and `localStorage`.
- **📸 Detail Page:**
  - Comprehensive photo gallery with thumbnail navigation.
  - Detailed camper specifications and user reviews.
  - Functional booking/reservation form with success notifications.
- **📱 Fully Responsive Design:**
  - Mobile-first approach using Vanilla CSS Modules.
  - Pixel-perfect adaptations for mobile, tablet, and desktop viewports.
- **⏳ Loading & Error States:**
  - Custom spinner indicators for all async operations.
  - Fallback UI for failed network requests.

---

## 🛠 Tech Stack & Libraries

This project was developed focusing on high performance, maintainability, and a clean UI/UX without relying on heavy UI frameworks.

| Technology | Description |
| :--- | :--- |
| **React 18/19** | Core UI library used for building interactive components. |
| **Vite** | Next-generation frontend tooling for fast development and optimized builds. |
| **Redux Toolkit** | State management library for handling campers data, filtering parameters, and user favorites. |
| **React-Redux** | Official React bindings for Redux. |
| **React Router DOM v7** | Declarative routing for navigating between Home, Catalog, and Detail pages. |
| **Axios** | Promise-based HTTP client for making API requests to the backend. |
| **Vanilla CSS Modules** | Component-scoped styling ensuring zero class name collisions and a maintainable CSS architecture. |
| **ESLint & Prettier** | Code linting and formatting standards. |

---

## 📂 Project Structure

```text
src/
├── assets/         # Static assets, images, and global icons
├── components/     # Reusable UI components
│   ├── catalog/    # Camper cards, filter panels
│   └── common/     # Header, Loader, Toast notifications, SVG Icons
├── pages/          # Application routes/pages
│   ├── Home/       # Landing page
│   ├── Catalog/    # Main camper browsing page
│   └── Detail/     # Individual camper detail page
├── redux/          # Redux Toolkit state slices
│   ├── campers/    # Async thunks and state for camper data
│   ├── filters/    # State for active search filters
│   └── favorites/  # State and localStorage logic for favorites
├── services/       # API configuration and endpoint methods (Axios)
└── styles/         # Global CSS variables and reset styles
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ERDLL0/TravelTrucks
   git
   cd TravelTrucks
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   Navigate to `http://localhost:5173/` in your web browser.

### Building for Production

To create an optimized production build:
```bash
npm run build
```
The compiled assets will be located in the `dist` folder.

---

## 🎨 Design & UI Philosophy

The application strictly follows a premium, clean SaaS-like design:
- **Typography:** Uses the modern **Inter** font for high legibility.
- **Colors:** A curated palette featuring stark whites, soft grays (`#F7F7F7`), deep slate text (`#101828`), and primary green (`#829B91`) with red accents for favorites (`#E44848`).
- **Interactions:** Subtle micro-animations, hover lifts, and crossfade transitions provide a highly polished user experience.

---

Developed with ❤️ using React and Redux.
