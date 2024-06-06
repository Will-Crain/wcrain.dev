import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URLs = {
    remote: 'https://monetary-tracker-server.onrender.com',
    local: 'http://localhost:3500'
}

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: URLs.remote }),
    tagTypes: ['billTracker'],
    endpoints: builder => ({

    })
})