import React from 'react'
import { Link } from 'react-router-dom'

import { BillTracker } from '../BillTracker'

const Home = () => {
  return (
    <section className='flex h-screen flex-row items-top justify-left w-full pt-4' id='content'>
      <Link to='/billTracker' className='w-48 h-48 bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700'>

      </Link>
    </section>
  )
}

export default Home