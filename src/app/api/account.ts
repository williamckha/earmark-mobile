import { api } from './api'

export interface Account {
  id: number,
  name: string,
  totalBalance: number
}

export interface Transaction {
  id: number,
  date: string,
  memo: string,
  amount: number,
  accountName: string,
  payeeName: string,
  categoryName: string
}

export const accountApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getAccounts: builder.query<Account[], void>({
      query: () => "accounts",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Account", id } as const))]
          : ["Account"]
    }),

    getAccount: builder.query<Account, number>({
      query: (id) => `accounts/${id}`,
      providesTags: (_account, _error, id) => [{ type: "Account", id }]
    }),

    getTransactions: builder.query<Transaction[], number>({
      query: (groupId) => `accounts/${groupId}/transactions`,
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Transaction", id } as const))]
          : ["Transaction"]
    }),

    addTransaction: builder.mutation<
      Transaction, { groupId: number, transaction: Pick<Transaction, "date" | "amount"> }
    >({
      query: ({ groupId, transaction }) => ({
        url: `accounts/${groupId}/transactions`,
        method: "POST",
        body: transaction
      }),
      invalidatesTags: ["Transaction"]
    }),

    deleteTransaction: builder.mutation<{ success: boolean, id: number }, number>({
      query: (id) => ({
        url: `transactions/${id}`,
        method: "DELETE"
      }),
      invalidatesTags: (_transaction, _error, id) => [{ type: "Transaction", id }]
    })

  })
})

export const {
  useGetAccountsQuery,
  useGetAccountQuery,
  useGetTransactionsQuery,
  useAddTransactionMutation,
  useDeleteTransactionMutation
} = accountApi