import React, { useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'

import decodeToken from '../decodeToken.js'
import { LoginContext } from '../App'


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
      <section className='flex min-h-[calc(100vh-4rem)] flex-col items-center w-screen p-2 sm:px-4 sm:w-[40rem]' id='content'>
        <div className='w-auto py-2 flex flex-row content-center items-center'>
          <p className='pr-2'>Your UserID is </p>
          <p className='p-1 text-center font-light border-2 border-black rounded-lg'>{decodedToken.id}</p>
        </div>
        {/* <div className='w-auto py-2 grid grid-rows-1 grid-cols-2 content-start'>
          <p className='flex flex-col justify-center items-center'>Disconnect billTracker</p>
          <button onClick={handleLogout} className='rounded-lg w-32 h-8 bg-black text-white font-bold m-2 p-2 flex flex-col items-center justify-center'>Disconnect</button>
        </div> */}
        <button onClick={handleLogout} className='rounded-lg w-32 h-8 bg-black text-white font-bold m-2 p-2 flex flex-col items-center justify-center'>Log out</button>
      </section>
      {loggedOut && <Navigate to='/login' />}
    </>
  )
}

export default Profile