// src/routes/main.routes.tsx
import { type RouteObject } from 'react-router-dom';

export const mainRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <h1>Dashboard</h1>, // Placeholder for the dashboard page
  },
  {
    path: '/profile',
    element: <h1>Profile Page</h1>, // Placeholder for the profile page
  },
];