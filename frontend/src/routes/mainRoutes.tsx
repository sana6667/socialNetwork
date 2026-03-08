// src/routes/main.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';
import { People } from '../pages/Main/PeoplePage';
import { Trips } from '../pages/Main/TripsPage';

export const mainRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <h1>Dashboard</h1>, // Placeholder for the dashboard page
  },
  {
    path: '/mainpage',
    element: <MainPage />, // Placeholder for the main page
    children: [
      { index: true, element: <People/> },
      { path: 'trips', element: <Trips/> },

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