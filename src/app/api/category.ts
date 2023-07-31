import { api } from './api'

export interface CategoryGroup {
  id: number,
  position: number,
  name: string,
  isIncome: boolean
}

export interface Category {
  id: number,
  position: number,
  name: string,
  isIncome: boolean
}

export const categoryApi = api.injectEndpoints({
  endpoints: (builder) => ({

    getCategories: builder.query<Category[], void>({
      query: () => "categories",
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: "Category", id } as const))]
          : ["Category"]
    }),

    getCategory: builder.query<Category, number>({
      query: (id) => `categories/${id}`,
      providesTags: (_category, _error, id) => [{ type: "Category", id }]
    }),

  })
})

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery
} = categoryApi