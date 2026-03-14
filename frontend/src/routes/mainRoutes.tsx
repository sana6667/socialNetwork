// src/routes/main.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';
import { People } from '../pages/Main/PeoplePage';
import { Trips } from '../pages/Main/TripsPage';
import { Explore } from '../pages/Main/Explore/Explore';
import { Discussions, Hangouts, Hosts } from '../pages/Main/Explore';

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
    ],
  },
  {
    path: 'explore',
    element: <Explore/>,
    children: [
      { path: 'hangouts', element: <Hangouts/> },
      { path: 'hosts', element: <Hosts/> },
      { path: 'discussions', element: <Discussions/> },
    ],
  },
  {
    path: '/profile',
    element: <h1>Profile Page</h1>, // Placeholder for the profile page
  },
];