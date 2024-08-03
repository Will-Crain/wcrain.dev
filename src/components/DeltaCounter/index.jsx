import React, { useState, useEffect } from 'react'
import { useGetBillTrackersQuery } from '../../app/api/billTrackersApiSlice'
import { useUpdateBillTrackerMutation } from '../../app/api/billTrackersApiSlice'

import './style.scoped.css'

const hardCodedIds = ['665d1d9d484dfd6374a8c36a', '66ae58d7f208c957e634d356', '66aeb7f933f514fe60705c71']

const DeltaCounter = () => {
	const [state, setState] = useState({ set: false, u0: { color: '', name: '', bills: [] }, u1: { color: '', name: '', bills: [] } })
	let { data: billTrackers, isLoading, isError } = useGetBillTrackersQuery()
	let [updateBillTracker] = useUpdateBillTrackerMutation()

	if (isError || isLoading) return <div />

	let myBillTrackers = billTrackers[0]//.find((s) => hardCodedIds.includes(s._id))
	if (state['set'] === false) setState({ set: true, u0: myBillTrackers['users'][0], u1: myBillTrackers['users'][1]})

	const onUserClicksButton = async (user) => {
		let response = await updateBillTracker({ id: myBillTrackers._id, user: user.name })

		let newState = {
			set: true,
			u0: {
				color: state.u0.color,
				name: state.u0.name,
				bills: [...state.u0.bills],
				paidFirst: state.u0.paidFirst,
				_id: state.u0._id,
			},
			u1: {
				color: state.u1.color,
				name: state.u1.name,
				bills: [...state.u1.bills],
				paidFirst: state.u1.paidFirst,
				_id: state.u1._id,
			},
		}

		// Push bill to appropriate user
		if (user.name === state.u0.name) newState['u0']['bills'].push(response.data)
		else if (user.name === state.u1.name) newState['u1']['bills'].push(response.data)

		// Set tie breaking flag
		if (newState.u0.bills.length === 1 && newState.u1.bills.length === 0) newState.u0.paidFirst = true
		else if (newState.u1.bills.length === 1 && newState.u0.bills.length === 0) newState.u1.paidFirst = true

		// Set new state
		setState(newState)
	}
	const getTurnString = (state) => {
		// Has anyone paid yet?
		if (!state.u0.paidFirst && !state.u1.paidFirst) return `Anyone's turn!`
		
		let firstPaid = state.u0.paidFirst ? state.u0 : state.u1
		let secondPaid = state.u0.paidFirst ? state.u1 : state.u0
		
		let diff = secondPaid.bills.length - firstPaid.bills.length

		if (diff === 0) return `${firstPaid.name}'s turn!`
		if (diff > 0) return `${firstPaid.name} has ${Math.abs(diff)+1} turns!`
		if (diff === -1) return `${secondPaid.name}'s turn!`
		if (diff < -1) return `${secondPaid.name} has ${Math.abs(diff)} turns!`

		return `Case not covered`
	}
	const getTurnColor = (state) => {
		if (!state.u0.paidFirst && !state.u1.paidFirst) return `#000000`
		
		let firstPaid = state.u0.paidFirst ? state.u0 : state.u1
		let secondPaid = state.u0.paidFirst ? state.u1 : state.u0
		
		let diff = secondPaid.bills.length - firstPaid.bills.length

		if (diff >= 0) return firstPaid.color
		return secondPaid.color
	}
	return (
		<>
			<div id='counter' style={{ color: getTurnColor(state), fontWeight: 'bold', fontSize: '48px' }}>
				<p>{getTurnString(state)}</p>
			</div>
			<div className='container'>
				<button onClick={() => onUserClicksButton(state.u0)} className='payBill' id={state.u0.name} style={{ backgroundColor: state.u0.color }}>
					{state.u0.name} pays
				</button>
				<button onClick={() => onUserClicksButton(state.u1)} className='payBill' id={state.u1.name} style={{ backgroundColor: state.u1.color }}>
					{state.u1.name} pays
				</button>
			</div>
		</>
	)
}
export default DeltaCounter
