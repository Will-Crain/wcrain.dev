import React, { useEffect, useState, useContext } from 'react'

import { Navigate } from 'react-router-dom'
import { LoginContext } from '../App'

import decodeToken from '../decodeToken'

const BillTracker = () => {
  let [loginContext, setLoginContext] = useContext(LoginContext)
  let [_, decodedLoginToken] = decodeToken(loginContext)

  let [redirectStatus, setRedirectStatus] = useState(false)

  let appToken = (window.localStorage.getItem('appToken') && JSON.parse(window.localStorage.getItem('appToken'))) || {}
  let [hasValidBillTrackerToken, decodedBillTrackerToken] = decodeToken(appToken?.billTracker) || [false, {}]
  let { userID, userName, userColor, userPaidFirst, targetID, targetName, targetColor, targetPaidFirst } = decodedBillTrackerToken

  let [billStats, setBillStats] = useState({ init: false, [userID]: [], [targetID]: [] })

  let apiGet = () => {
    let fetchOptions = {
      method: 'get',
      headers: { 'Content-Type': 'application/json', 'userID': decodedLoginToken.id },
    }
    let url = {
      'dev': 'http://localhost:3500',
      'production': 'https://monetary-tracker-server.onrender.com',

    }
    fetch(`${url[process.env.NODE_ENV]}/billTracker`, fetchOptions)
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

  let handleOnClick = () => {
    let fetchOptions = {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: decodedLoginToken.id }) // TODO: Add location info
    }
    let url = {
      'dev': 'http://localhost:3500',
      'production': 'https://monetary-tracker-server.onrender.com',

    }
    fetch(`${url[process.env.NODE_ENV]}/billTracker`, fetchOptions)
      .then((res) => {
        if (res.status === 201) return res.json()
        return {}
      })
      .then(data => {
        setBillStats({ ...billStats, init: false })

        let appToken = window.localStorage.getItem('appToken')
        if (!appToken || appToken == null) appToken = {}
        if (typeof appToken == 'string') appToken = JSON.parse(appToken)

        appToken['billTracker'] = data.token
        window.localStorage.setItem('appToken', JSON.stringify(appToken))
      })
      .catch((error) => {
        console.warn(error)
      })
  }
  let getTurnString = () => {
    // Has anyone paid yet?
    if (!userPaidFirst && !targetPaidFirst) return `Anyone's turn!`

    let firstPaid = userPaidFirst ? userID : targetID
    let secondPaid = userPaidFirst ? targetID : userID

    let diff = billStats[secondPaid].length - billStats[firstPaid].length

    if (diff === 0) return `${firstPaid === userID ? userName : targetName}'s turn!`
    if (diff > 0) return `${firstPaid === userID ? userName : targetName} has ${Math.abs(diff) + 1} turns!`
    if (diff === -1) return `${secondPaid === userID ? userName : targetName}'s turn!`
    if (diff < -1) return `${secondPaid === userID ? userName : targetName} has ${Math.abs(diff)} turns!`

    return `Case not covered`
  }
  let getTurnColor = () => {
    try {
      if (!billStats[userID].paidFirst && !billStats[targetID].paidFirst) return `#000000`

      let firstPaid = billStats[userID].paidFirst ? billStats[userID] : billStats[targetID]
      let secondPaid = billStats[userID].paidFirst ? billStats[targetID] : billStats[userID]

      let diff = secondPaid.bills.length - firstPaid.bills.length

      if (diff >= 0) return firstPaid.color
      return secondPaid.color
    }
    catch (e) {
      return '#000000'
    }
  }
  return (
    <>
      {redirectStatus && <Navigate to='/pair/billTracker' />}

      <section className='flex h-screen flex-row items-center justify-center w-screen p-4' id='content'>
        <div id='counter' className={`bg-[${getTurnColor()}] font-bold text-4xl`}>
          <p>{getTurnString()}</p>
        </div>
      </section>
      <button onClick={handleOnClick} className='bg-black text-white m-8 p-2 text-2xl font-semibold rounded-lg w-full h-16'>Pay!</button>
    </>
  )
}

export default BillTracker