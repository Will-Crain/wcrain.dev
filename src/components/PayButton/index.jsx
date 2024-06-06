import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import {useUpdateBillTrackerMutation} from '../../app/api/billTrackersApiSlice'

import './style.scoped.css'

const PayButton = (props) => {
	let {id, user, state, stateChanger} = props

	const [updateBillTracker, {isLoading, isSuccess, isError, error}] = useUpdateBillTrackerMutation()
	const onUserClicksButton = () => {
		stateChanger(0)
		console.log(`${id}\t${user.name}`)
		updateBillTracker({id: id, user: user.name})

		// if (user.name === state.u0.name) stateChanger({u0: {name: user.name, count: state.u0.count + 1}, u1: state.u1})
		// else stateChanger({u1: {name: user.name, count: state.u1.count + 1}, u0: state.u0})
	}
	return (
		<button onClick={() => onUserClicksButton()} className='payBill' id={user.name} style={{backgroundColor: user.color}}>
			{user.name} pays
		</button>
	)
}
export default PayButton
