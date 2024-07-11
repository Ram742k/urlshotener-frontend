// src/App.js
import React from 'react';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import DashboardWrapper from './pages/DashboardWrapper';
import UrlList from './pages/UrlList';
import CreateShortUrl from './pages/CreateShortUrl';
//app css import
import './App.css';

const router = createBrowserRouter([
  {
      path: "/",
      element: <Login />,
  },
  {
      path: "/register",
      element: <Register />,
  },
  {
      path: "/forgot-password",
      element: <ForgotPassword />,
  },
  {
      path: "/reset-password/:token",
      element: <ResetPassword />,
  },
  {
      path: "/dashboard",
      element: <DashboardWrapper />,
      children: [
          {
              path: "",
              element: <Dashboard />,
          },
          {
              path: "urls",
              element: <UrlList />,
          },
          {
              path: "shorten",
              element: <CreateShortUrl />,
          }
      ]
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App;
