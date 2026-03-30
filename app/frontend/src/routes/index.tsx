// src/routes/index.tsx
import { createBrowserRouter } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import { mainRoutes } from './mainRoutes';

export const router = createBrowserRouter([
  ...authRoutes,
  ...mainRoutes,
  {
    path: '*',
    element: <h1>404 Not Found</h1>,
  },
]);