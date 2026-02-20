// src/routes/auth.routes.tsx
import { type RouteObject } from 'react-router-dom';
import { Register } from '../pages/Auth/Register';
import { Login } from '../pages/Auth/Login';

export const authRoutes: RouteObject[] = [
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/reset',
    element: <h1>Reset Password</h1>, // time constraints, so just a placeholder
  },
];