import { apiSlice } from "../../../api/apiSlice";

export const ProductionOutputSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductionOutput: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `inventory/produce/filter?page=${
          page - 1
        }&size=10&sort=productionDate,${sort}&sort=productionTime,${sort}&${filterItem}`,
      }),
      providesTags: ["production-output"],
    }),
    saveProductionOutput: builder.mutation({
      query: (body) => ({
        url: "inventory/produce",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["production-output"],
    }),
    updateProductionOutput: builder.mutation({
      query: (body) => ({
        url: `inventory/produce`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["production-output"],
    }),
    deleteProductionOutput: builder.mutation({
      query: (id) => ({
        url: `inventory/produce/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["production-output"],
    }),
  }),
});

export const {
  useGetAllProductionOutputQuery,
  useSaveProductionOutputMutation,
  useUpdateProductionOutputMutation,
  useDeleteProductionOutputMutation,
} = ProductionOutputSlice;
