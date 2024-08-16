import React, { useState, useContext } from 'react'
import { LoginContext } from '../../App'

import { Outlet, Link, Navigate, useLocation } from 'react-router-dom'
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
	const { pathname: pathName } = useLocation()
	let [context, setContext] = useContext(LoginContext)

	// TODO replace below with authentication from server
	let [hasValidToken, token] = decodeToken(context)

	let gradient = ''
	if (hasValidToken) gradient = `bg-gradient-to-t from-white to-[${token.color}] from-50% to-100%`

	return (
		<>
			<div id='pageContainer' className='grid grid-cols-1 grid-rows-[4rem_auto] auto-rows-fr h-screen w-screen'>
				<div id='header' className={`px-4 flex flex-row text-2xl justify-center items-center w-screen h-16 font-bold text-black shadow-md ${gradient}`}>
					<Link to='/'>
						<FontAwesomeIcon icon={faHouse} />
					</Link>
					<div className='text-center w-screen p-2'>Hello, {hasValidToken ? token.firstName || 'stranger' : 'stranger'}!</div>
					<Link to={hasValidToken ? '/profile' : '/login'}>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</div>
				<section id='body' className='px-4 flex flex-col justify-start items-center w-screen h-full'>
					<Outlet />
				</section>
			</div>
			{['/', ''].includes(pathName) && <Navigate to='/home' />}
		</>
	)
}

export default RootRoute