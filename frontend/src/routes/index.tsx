/* eslint-disable @typescript-eslint/no-unused-vars */
// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import { mainRoutes } from './mainRoutes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>Home Works!</h1>,
  },
  {
    path: '/register',
    element: <h1>Register Works!</h1>,
  },
  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
]);