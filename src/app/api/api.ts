import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
 baseQuery: fetchBaseQuery({ baseUrl: 'https://153c-174-1-37-247.ngrok-free.app/api' }),

/**
 * Tag types must be defined in the original API definition
 * for any tags that would be provided by injected endpoints
 */
 tagTypes: ["Account", "Transaction", "Payee", "CategoryGroup", "Category"],

/**
 * This api has endpoints injected in adjacent files,
 * which is why no endpoints are shown below.
 */
 endpoints: () => ({}),
})
