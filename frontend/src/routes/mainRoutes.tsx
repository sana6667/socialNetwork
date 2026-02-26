// src/routes/main.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';

export const mainRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <h1>Dashboard</h1>, // Placeholder for the dashboard page
  },
  {
    path: '/mainpage',
    element: <MainPage />, // Placeholder for the main page
    children: [
      { index: true, element: <h1> Home </h1> },
      { path: 'home/trips', element: <h1> Trips </h1> },

      { 
        path: 'explore',
        element: <h1> Explore </h1>,
        children: [
          { index: true, element: <h1> Explore Home </h1> },
        ],
      },
    ],
  },
  {
    path: '/profile',
    element: <h1>Profile Page</h1>, // Placeholder for the profile page
  },
];