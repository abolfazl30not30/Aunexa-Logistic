
import { apiSlice } from "../../../api/apiSlice";

export const PurchaseRequestListSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPurchaseRequestList: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`bill/bill-cycle/filter?page=${page - 1}&size=10&sort=requestDate,${sort}&sort=requestTime,${sort}&status=IN_PROGRESS&${filterItem}`,
            }),
            providesTags: ['purchase-request-list']
        }),
        savePurchaseRequestList: builder.mutation({
            query: (body) => ({
                url: 'bill/bill-cycle',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['purchase-request-list']
        }),
        updatePurchaseRequestList: builder.mutation({
            query: (body) => ({
                url: `bill/bill-cycle`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['purchase-request-list']
        }),
        deletePurchaseRequestList: builder.mutation({
            query: ( id ) => ({
                url: `bill/bill-cycle/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['purchase-request-list']
        }),
        acceptPurchaseRequestList: builder.mutation({
            query: (body) => ({
                url: 'bill/bill-cycle/accept',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['purchase-request-list']
        }),
        rejectPurchaseRequestList: builder.mutation({
            query: (body) => ({
                url: 'bill/bill-cycle/reject',
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['purchase-request-list']
        }),
    })
})

export const {
    useGetAllPurchaseRequestListQuery,
    useSavePurchaseRequestListMutation,
    useUpdatePurchaseRequestListMutation,
    useDeletePurchaseRequestListMutation,
    useAcceptPurchaseRequestListMutation,
    useRejectPurchaseRequestListMutation,
} = PurchaseRequestListSlice