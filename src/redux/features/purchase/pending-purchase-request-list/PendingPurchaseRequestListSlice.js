import { apiSlice } from "@/redux/api/apiSlice";

export const PendingPurchaseRequestListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPendingPurchaseRequestList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/bill/filter?status=IN_PROGRESS&page=${
          page - 1
        }&size=10&sort=confirmationDate,${sort}&sort=confirmationTime,${sort}&${filterItem}`,
      }),
      providesTags: ["pending-purchase-request-list"],
    }),
    savePendingPurchaseRequestList: builder.mutation({
      query: (body) => ({
        url: `bill/payment`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["pending-purchase-request-list"],
    }),
    updatePendingPurchaseRequestList: builder.mutation({
      query: (body) => ({
        url: `bill/bill`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["pending-purchase-request-list"],
    }),
    deletePendingPurchaseRequestList: builder.mutation({
      query: (id) => ({
        url: `bill/bill/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["pending-purchase-request-list"],
    }),
  }),
});

export const {
  useGetAllPendingPurchaseRequestListQuery,
  useSavePendingPurchaseRequestListMutation,
  useUpdatePendingPurchaseRequestListMutation,
  useDeletePendingPurchaseRequestListMutation,
} = PendingPurchaseRequestListSlice;
