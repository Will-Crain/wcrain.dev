import React, { createContext } from 'react'

export const App = () => {
  return (
    <div>App</div>
  )
}

export const LoginContext = createContext({ context: '', setContext: () => { } })
export const DarkModeContext = createContext(false)