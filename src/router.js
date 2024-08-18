import Root from './routes/Root'
import Login from './routes/Login'
import Register from './routes/Register'
import Profile from './routes/Profile'
import Home from './routes/Home'
import Pair from './routes/Pair'

import BillTracker from './routes/BillTracker'

import { createBrowserRouter, Link } from 'react-router-dom'

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
      {
        path: '/pair/:app',
        element: <Pair />
      },
      {
        path: '/billTracker',
        element: <BillTracker />,
      }
    ]
  },
])

export default router