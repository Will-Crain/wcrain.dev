import React, { createContext, useState } from 'react'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Root from './routes/Root'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Home from './routes/Home'

import BillTracker from './routes/BillTracker'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/home',
        element: <Home />
      },
    ]
  },
  {
    path: '/billTracker',
    element: <BillTracker />,
  }
])

export const App = () => {
  let [context, setContext] = useState(window.localStorage.getItem('token') || '')
  return (
    <LoginContext.Provider value={[context, setContext]}>
      <RouterProvider router={router} />
    </LoginContext.Provider>
  )
}

export const LoginContext = createContext({ context: '', setContext: () => { } })
export const DarkModeContext = createContext(false)