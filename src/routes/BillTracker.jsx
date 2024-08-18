import React, { useEffect, useState, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { LoginContext } from '../App'

import decodeToken from '../decodeToken'

const BillTracker = () => {
  let [, decodedLoginToken] = useContext(LoginContext)

  let [redirectStatus, setRedirectStatus] = useState(false)

  let [, appToken] = decodeToken(window.localStorage.appToken)
  let hasValidBillTrackerToken = appToken.hasOwnProperty('billTracker')

  let [billStats, setBillStats] = useState({ init: false, [userID]: [], [targetID]: [] })

  let apiGet = () => {
    let fetchOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'userID': decodedLoginToken.id },
    }
    fetch(`http://localhost:3500/billTracker`, fetchOptions)
      .then((res) => {
        if (res.status === 201) return res.json()
        if (res.status !== 201) setRedirectStatus(true)
        return {}
      })
      .then((data) => {
        let appToken = window.localStorage.getItem('appToken')
        if (!appToken || appToken == null) appToken = {}
        if (typeof appToken == 'string') appToken = JSON.parse(appToken)

        appToken['billTracker'] = data.token
        window.localStorage.setItem('appToken', JSON.stringify(appToken))

        if (billStats.init === false) setBillStats({ ...data.data, init: true, })
      })
      .catch((error) => {
        console.warn(error)
      })
  }

  // Check for valid billTracker
  useEffect(() => {
    if (billStats.init === true) return
    apiGet()
  })

  // Poll data
  useEffect(() => {
    let timer = setInterval(apiGet, 2000)
    return () => clearInterval(timer)
  }, [])
  return (
    <>
      {redirectStatus && <Navigate to='/pair/billTracker' />}
      <div>BillTracker</div>
    </>
  )
}

export default BillTracker