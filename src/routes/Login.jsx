import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { LoginContext } from '../App'

let Login = () => {
	let [context, setContext] = useContext(LoginContext)
	let [loginStatus, setLoginStatus] = useState(false)
	let [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	let handleSubmit = (e) => {
		e.preventDefault()

		let postData = {
			email: formData.email,
			password: formData.password,
		}

		let fetchOptions = {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData),
		}
		let url = {
			'dev': 'http://localhost:3500',
			'production': 'https://monetary-tracker-server.onrender.com',

		}
		fetch(`${url[process.env.NODE_ENV] || url['dev']}/login`, fetchOptions)
			.then((res) => {
				if (res.status !== 201) return false
				setLoginStatus(true)
				return res.json()
			})
			.then((data) => {
				if (!data?.message) return false
				window.localStorage.setItem('token', data.message)
				setContext(data.message)
			})
			.catch((error) => {
				console.error(error)
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
		<section className='flex h-auto flex-col items-center justify-center w-screen p-2 sm:px-4 sm:w-[40rem]' id='content'>
			<div className='w-full bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='text-center m-4 text-xl font-bold text-black md:text-3xl dark:text-white'>
					Sign in
				</h1>
				<form onSubmit={handleSubmit} className='w-full flex flex-col p-4 gap-4 items-center'>
					<input name='email' value={formData.email} onChange={handleInputChange} placeholder='Email' type='email' className='w-full sm:w-96 text-base p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					<input name='password' value={formData.password} onChange={handleInputChange} placeholder='Password' type='password' className='w-full sm:w-96 text-base p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					<button type='submit' className='w-full sm:w-96 p-2 mx-2 rounded-lg text-white font-bold text-base bg-black'>
						Log In
					</button>
					<p className='text-sm font-light text-black dark:text-gray-400'>
						Need an account instead? <Link to='/register' className='font-bold bg-black rounded-lg px-1 text-white'>Create one</Link>
					</p>
				</form>

			</div>
			{loginStatus && <Navigate to='/' />}
		</section>
	)
}

export default Login