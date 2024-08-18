import React, { useState, useContext } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { LoginContext } from '../App'
import decodeToken from '../decodeToken'

const Pair = (props) => {
  let { app } = useParams()

  let [loginContext, setLoginContext] = useContext(LoginContext)
  let [_, decodedLoginToken] = decodeToken(loginContext)
  let [hasAppToken, decodedAppToken] = decodeToken(window.localStorage.getItem('appToken'))

  let [formData, setFormData] = useState({ targetID: '' })
  let [linkStatus, setLinkStatus] = useState(false)

  let handleSubmit = (e) => {
    e.preventDefault()

    let postData = {
      userID: decodedLoginToken.id,
      targetID: formData.targetID,
    }

    let fetchOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(postData),
    }

    fetch(`http://localhost:3500/${app}/pair`, fetchOptions)
      .then((res) => {
        if (res.status === 201) return res.json()
        if (res.status !== 201) return false

      })
      .then((data) => {
        console.log(data)
        setLinkStatus(true)
      })
      .catch((error) => {
        // console.error(error)
      })
  }
  let handleInputChange = (event) => {
    let { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }
  return (
    <section className='flex h-screen flex-col items-center justify-center w-full px-4 sm:w-[40rem]' id='alert'>
      <div className='w-full bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700'>
        <h1 className='text-center m-2 mb-0 text-xl font-bold text-black md:text-3xl dark:text-white'>
          Bill Tracker Connection
        </h1>
        <form onSubmit={handleSubmit} className='w-full flex flex-col p-4 gap-4 items-center'>
          {/* <p className='px-2 text-center text-xs h-auto'>This application requires the linking of your account to another user's account. A user you wish to link to can access their UserID on their profile page. Please copy that UserID into the field below, then submit this form. If successful, you will be automatically redirected.</p> */}
          <p className='px-2 text-center text-xs h-auto'>The application you're trying to access requires the linking of two accounts. The user you wish to link to can access their UserID from their Profile page. You may enter their UserID below. Upon submitting, </p>

          <span className='p-1 w-full' />

          <input name="targetID" value={formData.targetID} onChange={handleInputChange} placeholder='User ID' className='h-10 w-96 p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>

          <button type='submit' className='w-96 p-2 h-10 mx-2 rounded-lg text-black font-bold text-l bg-amber-500'>
            Link Accounts
          </button>

        </form>
      </div>
      {linkStatus && <Navigate to={`/${app}`} />}
    </section>
  )
}

export default Pair