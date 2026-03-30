// src/routes/main.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { MainPage } from '../pages/Main/MainPage';
import { People } from '../pages/Main/PeoplePage';
import { MainTrips } from '../pages/Main/MainTrips';
import { Explore } from '../pages/Main/Explore/Explore';
import { Discussions, Hangouts, Hosts } from '../pages/Main/Explore';
import { Trips } from '../pages/Main/Trips';
import { TripsHome } from '../pages/Main/Trips/TripsHome';
import { Memories } from '../pages/Main/Trips/Memories';

export const mainRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: <h1>Dashboard</h1>, // Placeholder for the dashboard page
  },
  {
    path: '/',
    element: <MainPage />, // Placeholder for the main page
    children: [
      { index: true, element: <People/> },
      { path: 'home/trips', element: <MainTrips/> },
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
    path: 'trips',
    element: <Trips/>,
    children: [
      { index: true, element: <TripsHome/> },
      { path: 'memories', element: <Memories/> },
    ],
  },
  {
    path: '/profile',
    element: <h1>Profile Page</h1>, // Placeholder for the profile page
  },
];