import { Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

let decode = (token) => {
  let base64Payload = token.split('.')[1]
  let base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
  let payload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))

  return JSON.parse(payload)
}

const RootRoute = () => {
  let greetingText = 'stranger'
  let token = window.localStorage.token
  if (token && decode(token)?.firstName) greetingText = decode(token).firstName

  return (
    <>
      <section id='header' className='px-4 flex flex-row text-2xl fixed top-0 justify-center items-center w-screen h-16 font-bold text-black bg-white shadow-md'>
        <Link to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </Link>
        <div className='text-center w-screen p-2'>Hello, {greetingText}!</div>
        <Link to='/login'>
          <FontAwesomeIcon icon={faUser} />
        </Link>
      </section>
      <Outlet />
    </>
  )
}

export default RootRoute