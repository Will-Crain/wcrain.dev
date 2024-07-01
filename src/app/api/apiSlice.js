import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const URLs = {
    production: 'https://monetary-tracker-server.onrender.com',
    development: 'http://localhost:3500'
}

console.log(`THIS IS ${process.env.NODE_ENV}\nConnecting to ${URLs[process.env.NODE_ENV]}`)

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: URLs[process.env.NODE_ENV] }),
    tagTypes: ['billTracker'],
    endpoints: builder => ({

    })
})