import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from './apiSlice'

const billTrackersAdapter = createEntityAdapter({})
const initialState = billTrackersAdapter.getInitialState()

export const billTrackersApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getBillTrackers: builder.query({
			query: () => '/billTrackers',
			validateStatus: (response, result) => response.status === 2000 && !result.isError,
			keepUnusedDataFor: 5,
			providesTags: ['billTracker']
		}),
		updateBillTracker: builder.mutation({
			query: initialBillTrackerData => ({
				url: '/billTrackers',
				method: 'PATCH',
				body: {
					...initialBillTrackerData,
				},
			}),
			invalidateTags: ['billTracker']
		})
	})
})

export const {
	useGetBillTrackersQuery,
	useUpdateBillTrackerMutation,
} = billTrackersApiSlice

export const selectBillTrackersResult = billTrackersApiSlice.endpoints.getBillTrackers.select()

const selectBillTrackersData = createSelector(
	selectBillTrackersResult, billTrackersResult => billTrackersResult.data
)
export const {
	selectAll: selectAllBillTrackers,
	selectById: selectBillTrackersById,
	selectIds: selectBillTrackersIds
} = billTrackersAdapter.getSelectors(state => selectBillTrackersData(state) ?? initialState)