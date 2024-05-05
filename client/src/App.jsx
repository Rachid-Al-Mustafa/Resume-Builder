import React, { useContext } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import ProtectedRoutes from './utils/ProtectedRoutes';
import SignIn from './pages/signIn';
import SignUp from './pages/signUp';
import NotFound from './pages/notFound';
import ForgotPassword from './pages/forgotPassword';
import ResetPassword from './pages/resetPassword';
import Home from './pages/home';
import GetStarted from './pages/getStarted';
import Templates from './pages/template';
import Profile from './pages/Profile/index';

function App() {

  const protectedRoutes = [
    {
      path: '/home',
      element: <Home />,
    },
    {
      path: `/getStarted`,
      element: <GetStarted />,
    },
    {
      path: '/Templates',
      element: <Templates />,
    },
    {
      path: `/profile`,
      element: <Profile />,
    },
  ];

  const publicRoutes = [
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: '/register',
      element: <SignUp />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/reset-password/:id/:token',
      element: <ResetPassword />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ];

  return (
    <React.StrictMode>
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </React.StrictMode>
  );
}

export default App;
