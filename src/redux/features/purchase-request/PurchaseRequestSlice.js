
import { apiSlice } from "../../api/apiSlice";

export const PurchaseRequestSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllPurchaseRequest: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`bill/bill-cycle/filter?page=${page - 1}&size=10&sort=requestDate,${sort}&sort=requestTime,${sort}&${filterItem}`,
            }),
            providesTags: ['purchase-request']
        }),
        savePurchaseRequest: builder.mutation({
            query: (body) => ({
                url: 'bill/bill-cycle',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['purchase-request']
        }),
        updatePurchaseRequest: builder.mutation({
            query: (body) => ({
                url: `bill/bill-cycle`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['purchase-request']
        }),
        deletePurchaseRequest: builder.mutation({
            query: ( id ) => ({
                url: `bill/bill-cycle/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['purchase-request']
        }),
    })
})

export const {
    useGetAllPurchaseRequestQuery,
    useSavePurchaseRequestMutation,
    useUpdatePurchaseRequestMutation,
    useDeletePurchaseRequestMutation,
} = PurchaseRequestSlice