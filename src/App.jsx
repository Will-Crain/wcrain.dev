import React, { createContext, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

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