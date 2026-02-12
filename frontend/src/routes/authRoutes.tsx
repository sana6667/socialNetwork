// src/routes/auth.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { Register } from '../pages/Auth/Register';

export const authRoutes: RouteObject[] = [
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <h1>Login Page</h1>, // time constraints, so just a placeholder
  },
  {
    path: '/reset',
    element: <h1>Reset Password</h1>, // time constraints, so just a placeholder
  },
];