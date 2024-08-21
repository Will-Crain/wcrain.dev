import React from 'react'
import { Link } from 'react-router-dom'

import decodeToken from '../decodeToken'

const Home = () => {
  let appToken = (window.localStorage.getItem('appToken') && JSON.parse(window.localStorage.getItem('appToken'))) || {}
  let [hasValidBillTrackerToken, decodedBillTrackerToken] = decodeToken(appToken?.billTracker) || [false, {}]

  return (
    <section className='flex flex-col sm:flex-row h-[calc(100vh-4rem)] w-screen items-end justify-end sm:justify-left p-4 sm:items-start sm:justify-start' id='content'>
      {/* <Link to={hasValidBillTrackerToken ? '/billTracker' : '/pair/billTracker'} app={hasValidBillTrackerToken ? '' : 'billTracker'} className='w-screen h-48 bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700 text-center font-bold text-2xl sm:w-48'> */}
      <Link to='/billTracker' app={hasValidBillTrackerToken ? '' : 'billTracker'} className='w-full sm:size-48 h-36 bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700 text-center font-bold text-2xl'>
        Bill Tracker
      </Link>
    </section>
  )
}

export default Home