import { api } from './api'

export interface Payee {
  id: number,
  name: string,
}

export const payeeApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getPayees: builder.query<Payee[], void>({
      query: () => "payees",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Payee", id } as const))]
          : ["Payee"]
    }),

    getPayee: builder.query<Payee, number>({
      query: (id) => `payees/${id}`,
      providesTags: (_payee, _error, id) => [{ type: "Payee", id }]
    }),


    addPayee: builder.mutation<
      Payee, { payee: Pick<Payee, "name"> }
    >({
      query: (payee) => ({
        url: "payees",
        method: "POST",
        body: payee
      }),
      invalidatesTags: ["Payee"]
    }),

    deletePayee: builder.mutation<{ success: boolean, id: number }, number>({
      query: (id) => ({
        url: `payees/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_payee, _error, id) => [{ type: "Payee", id }]
    })

  })
})

export const {
  useGetPayeesQuery,
  useGetPayeeQuery,
  useAddPayeeMutation,
  useDeletePayeeMutation
} = payeeApi