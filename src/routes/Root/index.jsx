import React, { useState } from 'react'
import { LoginContext } from '../../App'

import { Outlet, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

let decodeToken = (token) => {
	if (!token) return [false, {}]

	let base64Payload = token.split('.')[1]
	if (!base64Payload) return [false, {}]

	let base64 = base64Payload.replace(/-/g, '+').replace(/_/g, '/')
	let payload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''))
	if (!payload) return [false, {}]

	return [true, JSON.parse(payload)]
}

const RootRoute = () => {
	let [context, setContext] = useState(window.localStorage.getItem('token') || '')

	// TODO replace below with authentication from server
	let [hasValidToken, token] = decodeToken(context)

	return (
		<LoginContext.Provider value={[context, setContext]}>
			<div id='pageContainer' className='grid grid-cols-1 grid-rows-[4rem_auto] auto-rows-fr h-screen w-screen'>
				<section id='header' className='px-4 flex flex-row text-2xl justify-center items-center w-screen h-16 font-bold text-black bg-white shadow-md'>
					<Link to='/'>
						<FontAwesomeIcon icon={faHouse} />
					</Link>
					<div className='text-center w-screen p-2'>Hello, {hasValidToken ? token.firstName || 'stranger' : 'stranger'}!</div>
					<Link to={hasValidToken ? '/profile' : '/login'}>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</section>
				<section id='body' className='px-4 flex flex-col justify-start items-center w-screen h-full'>
					<Outlet />
				</section>
			</div>
		</LoginContext.Provider>
	)
}

export default RootRoute