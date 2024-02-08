import { apiSlice } from "../../api/apiSlice";

export const SalesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/invoice/filter?page=${
          page - 1
        }&size=10&sort=salesDate,${sort}&sort=salesTime,${sort}&${filterItem}`,
      }),
      providesTags: ["sales"],
    }),
    saveSales: builder.mutation({
      query: (body) => ({
        url: "bill/invoice",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["sales"],
    }),
    updateSalesItem: builder.mutation({
      query: (body) => ({
        url: "bill/invoice-item",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sales"],
    }),
    updateSales: builder.mutation({
      query: (body) => ({
        url: `bill/invoice`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sales"],
    }),
    deleteSalesItem: builder.mutation({
      query: (id) => ({
        url: `bill/invoice-item/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["sales"],
    }),
    deleteSales: builder.mutation({
      query: (id) => ({
        url: `bill/invoice/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["sales"],
    }),
  }),
});

export const {
  useGetAllSalesListQuery,
  useSaveSalesMutation,
  useUpdateSalesItemMutation,
  useUpdateSalesMutation,
  useDeleteSalesItemMutation,
  useDeleteSalesMutation,
} = SalesSlice;
