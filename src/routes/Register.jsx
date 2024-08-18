import React, { useState, useContext } from 'react'
import { Link, Navigate } from 'react-router-dom'

import { LoginContext } from '../App'

let Register = () => {
	let [, setContext] = useContext(LoginContext)
	let [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmation: '',
		firstName: '',
		lastName: '',
		color: '#000000',
		code: '',
	})
	let [registrationStatus, setRegistrationStatus] = useState(false)

	let handleSubmit = (e) => {
		e.preventDefault()
		if (formData.password !== formData.confirmation) return false

		let postData = {
			email: formData.email,
			password: formData.password,
			firstName: formData.firstName,
			lastName: formData.lastName,
			color: formData.color,
			code: formData.code,
		}

		let fetchOptions = {
			method: 'post',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(postData),
		}

		fetch('http://localhost:3500/register', fetchOptions)
			.then((res) => {
				if (res.status !== 201) return false
				setRegistrationStatus(true)
				return res.json()
			})
			.then((data) => {
				if (!data?.message) return false

				// console.log(`MESSAGE\t${data.message}`)
				window.localStorage.setItem('token', data.message)
				setContext(data.message)
			})
			.catch((error) => {
				// console.error(error)
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
		<section className='flex h-screen flex-col items-center justify-center w-full px-4 sm:w-[40rem]' id='register'>
			<div className='w-full bg-white rounded-lg shadow-md dark:border dark:bg-gray-800 dark:border-gray-700'>
				<h1 className='text-center m-2 mb-0 text-xl font-bold text-black md:text-3xl dark:text-white'>
					Create an account
				</h1>
				<form onSubmit={handleSubmit} className='w-full flex flex-col p-4 gap-4 items-center'>
					<div className='flex flex-row w-full content-between sm:w-96'>
						<input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder='First Name' className='w-1/2 p-2 ml-0 mx-2 h-10  bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
						<input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder='Last Name' className='w-1/2 p-2 mr-0 mx-2 h-10  bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					</div>
					<div className='flex flex-row w-full sm:w-96 justify-center items-center'>
						<input type='color' name='color' value={formData.color} onChange={handleInputChange} className='h-8 w-8' />
						<p className='px-2 font-bold'>What's your favorite color?</p>
					</div>

					<span className='p-1 w-full' />

					<input name="email" value={formData.email} onChange={handleInputChange} placeholder='Email' type='email' className='h-10 w-full sm:w-96 p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					<input name="password" value={formData.password} onChange={handleInputChange} placeholder='Password' type='password' className='h-10 w-full sm:w-96 p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					<input name="confirmation" value={formData.confirmation} onChange={handleInputChange} placeholder='Confirm' type='password' className='h-10 w-full sm:w-96 p-2 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>

					<span className='p-1 w-full' />

					<div className='flex flex-col w-full sm:w-96 justify-center items-center'>
						<p className='px-2 text-center text-xs h-auto'>This code is handed out personally by the developer to limit account creation. Please email Crain.Will@proton.me if you'd like a code.</p>
						<input name="code" value={formData.code} onChange={handleInputChange} placeholder='Code' className='w-full sm:w-96 p-2 mr-0 mx-2 bg-gray-50 border border-gray-100 text-black rounded-lg'></input>
					</div>

					<span className='p-1 w-full' />

					<button type='submit' className='w-full sm:w-96 p-2 h-10 mx-2 rounded-lg text-black font-bold text-l bg-amber-500'>
						Register
					</button>
					<p className='text-sm font-light text-black dark:text-gray-400'>
						Already have an account? <Link to='/login' className='font-bold bg-amber-500 rounded-lg px-1 text-black'>Log in</Link>
					</p>
				</form>
			</div>
			{registrationStatus && <Navigate to='/' />}
		</section>
	)
}

export default Register