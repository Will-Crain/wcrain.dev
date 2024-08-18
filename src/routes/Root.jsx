import React, { useState, useContext } from 'react'
import { LoginContext } from '../App'

import { Outlet, Link, Navigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'

import decodeToken from '../decodeToken'

const RootRoute = () => {
	const { pathname: pathName } = useLocation()
	let [context, setContext] = useContext(LoginContext)

	// TODO replace below with authentication from server
	let [hasValidToken, token] = decodeToken(context)

	let gradient = ''
	if (hasValidToken) gradient = `bg-gradient-to-t from-white to-[${token.color}] from-50% to-100%`

	return (
		<>
			<div id='pageContainer' className='grid grid-cols-1 sm:grid-rows-[4rem_auto] auto-rows-fr h-screen w-screen grid-rows-[auto_4rem]'>
				<div id='header' className={`px-4 flex flex-row text-2xl justify-center items-center w-screen h-16 font-bold text-black shadow-md order-last sm:order-first`}>
					<Link to='/'>
						<FontAwesomeIcon icon={faHouse} />
					</Link>
					<div className='text-center w-screen p-2'>Hello, {hasValidToken ? token.firstName || 'stranger' : 'stranger'}!</div>
					<Link to={hasValidToken ? '/profile' : '/login'}>
						<FontAwesomeIcon icon={faUser} />
					</Link>
				</div>
				<section id='body' className='px-4 flex flex-col justify-start items-center h-[calc(100vh-4rem)] w-screen'>
					<Outlet />
				</section>
			</div>
			{['/', ''].includes(pathName) && <Navigate to='/home' />}
		</>
	)
}

export default RootRoute