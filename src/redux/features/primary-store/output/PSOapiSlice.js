import { apiSlice } from "../../../api/apiSlice";

export const PSOapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPSO: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `inventory/store-output/primary/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["primary-store-output"],
    }),
    savePSO: builder.mutation({
      query: (body) => ({
        url: "inventory/store-output/primary",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["primary-store-output"],
    }),
    updatePSO: builder.mutation({
      query: (body) => ({
        url: `inventory/store-output/primary`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["primary-store-output"],
    }),
    deletePSO: builder.mutation({
      query: (id) => ({
        url: `inventory/store-output/primary/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["primary-store-output"],
    }),
  }),
});

export const {
  useGetAllPSOQuery,
  useSavePSOMutation,
  useUpdatePSOMutation,
  useDeletePSOMutation,
} = PSOapiSlice;
