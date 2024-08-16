import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import { LoginContext } from '../../App'

const Profile = () => {
  let [loggedOut, setLoggedOut] = useState(false)
  let [, setContext] = useContext(LoginContext)

  let handleLogout = () => {
    window.localStorage.removeItem('token')
    setContext('')
    setLoggedOut(true)
  }
  return (
    <>
      <button onClick={handleLogout} className='rounded-lg w-32 h-8 bg-amber-500 text-black font-bold m-2 p-2 flex flex-col items-center justify-center'>Log out</button>
      {loggedOut && <Navigate to='/login' />}
    </>
  )
}

export default Profile