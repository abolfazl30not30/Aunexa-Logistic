
import { apiSlice } from "../../api/apiSlice";

export const FailureReasonSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllFailureReason: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/product/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['failure-reason']
        }),
        saveFailureReason: builder.mutation({
            query: (body) => ({
                url: 'inventory/product',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['failure-reason']
        }),
        updateFailureReason: builder.mutation({
            query: (body) => ({
                url: `inventory/product`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['failure-reason']
        }),
        deleteFailureReason: builder.mutation({
            query: ( id ) => ({
                url: `inventory/product/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['failure-reason']
        }),
    })
})

export const {
    useGetAllFailureReasonQuery,
    useSaveFailureReasonMutation,
    useUpdateFailureReasonMutation,
    useDeleteFailureReasonMutation,
} = FailureReasonSlice