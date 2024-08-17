import React from 'react'
import { Link } from 'react-router-dom'

import { BillTracker } from '../BillTracker'

const Home = () => {
  return (
    <section className='flex h-screen flex-row items-top justify-left w-screen p-4' id='content'>
      <Link to='/billTracker' className='w-screen h-48 bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700 text-center font-bold text-2xl sm:w-48'>
        Bill Tracker
      </Link>
    </section>
  )
}

export default Home