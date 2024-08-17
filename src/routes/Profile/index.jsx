import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import decodeToken from '../../decodeToken.js'
import { LoginContext } from '../../App'


const Profile = () => {
  let [loggedOut, setLoggedOut] = useState(false)
  let [context, setContext] = useContext(LoginContext)

  let [hasValidToken, decodedToken] = decodeToken(context)
  console.log(decodedToken)

  let handleLogout = () => {
    window.localStorage.removeItem('token')
    setContext('')
    setLoggedOut(true)
  }
  return (
    <>
      <div className='w-auto py-2 flex flex-row content-center items-center'>
        <p className=''>Your UserID is </p>
        <p className='mx-1 px-[2px] text-center font-light p-1px border-2 border-black rounded-lg'>{decodedToken.id}</p>
      </div>
      <button onClick={handleLogout} className='rounded-lg w-32 h-8 bg-amber-500 text-black font-bold m-2 p-2 flex flex-col items-center justify-center'>Log out</button>
      {loggedOut && <Navigate to='/login' />}
    </>
  )
}

export default Profile