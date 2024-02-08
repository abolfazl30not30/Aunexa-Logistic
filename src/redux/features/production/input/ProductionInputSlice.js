import { apiSlice } from "../../../api/apiSlice";

export const ProductionInputSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProductionInput: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `inventory/produce-input/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["produce-input"],
    }),
    saveProductionInput: builder.mutation({
      query: (body) => ({
        url: "inventory/produce-input",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["produce-input"],
    }),
    updateProductionInput: builder.mutation({
      query: (body) => ({
        url: `inventory/produce-input`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["produce-input"],
    }),
    deleteProductionInput: builder.mutation({
      query: (id) => ({
        url: `inventory/produce-input/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["produce-input"],
    }),
  }),
});

export const {
  useGetAllProductionInputQuery,
  useSaveProductionInputMutation,
  useUpdateProductionInputMutation,
  useDeleteProductionInputMutation,
} = ProductionInputSlice;
