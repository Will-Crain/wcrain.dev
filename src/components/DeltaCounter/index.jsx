import React, {useState, useEffect} from 'react'
import {useGetBillTrackersQuery} from '../../app/api/billTrackersApiSlice'
import {useUpdateBillTrackerMutation} from '../../app/api/billTrackersApiSlice'

import './style.scoped.css'

const hardCodeId = '665d1d9d484dfd6374a8c36a'

const DeltaCounter = () => {
	const [state, setState] = useState({set: false, u0: {color: '', name: '', bills: []}, u1: {color: '', name: '', bills: []}})
	let {data: billTrackers, isLoading, isError} = useGetBillTrackersQuery()
	let [updateBillTracker] = useUpdateBillTrackerMutation()

	if (isError || isLoading) return <div />

	let myBillTrackers = billTrackers.find((s) => s._id === hardCodeId)
	if (state['set'] === false) setState({set: true, u0: myBillTrackers['users'][0], u1: myBillTrackers['users'][1]})

	let color = '#000000'
	if (state.u1.bills.length > state.u0.bills.length) color = state.u0['color']
	else if (state.u1.bills.length < state.u0.bills.length) color = state.u1['color']

	const onUserClicksButton = async (user) => {
		let response = await updateBillTracker({id: hardCodeId, user: user.name})
		let newState = {
			set: true,
			u0: {
				color: state.u0.color,
				name: state.u0.name,
				bills: [...state.u0.bills],
				_id: state.u0._id,
			},
			u1: {
				color: state.u1.color,
				name: state.u1.name,
				bills: [...state.u1.bills],
				_id: state.u1._id,
			},
		}
		if (user.name === state.u0.name) newState['u0']['bills'].push(response.data)
		else if (user.name === state.u1.name) newState['u1']['bills'].push(response.data)
		setState(newState)
		console.log(`${hardCodeId}\t${user.name}`)
	}
	return (
		<>
			<div id='counter' style={{color: color, fontWeight: 'bold', fontSize: '48px'}}>
				{Math.abs(state.u1.bills.length - state.u0.bills.length)}
			</div>
			<div className='container'>
				<button onClick={() => onUserClicksButton(state.u0)} className='payBill' id={state.u0.name} style={{backgroundColor: state.u0.color}}>
					{state.u0.name} pays
				</button>
				<button onClick={() => onUserClicksButton(state.u1)} className='payBill' id={state.u1.name} style={{backgroundColor: state.u1.color}}>
					{state.u1.name} pays
				</button>
			</div>
		</>
	)
}
export default DeltaCounter
