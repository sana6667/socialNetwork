// src/routes/auth.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { Register } from '../pages/Auth/Register';

export const authRoutes: RouteObject[] = [
  {
    path: '/',
    element: <Register />,
  },
  {
    path: '/register',

  },
  {
    path: '/login',

  },
  {
    path: '/reset',
  },
];