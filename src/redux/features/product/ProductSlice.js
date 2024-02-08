
import { apiSlice } from "../../api/apiSlice";

export const ProductSlice  = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllProductList: builder.query({
            query: ({page, sort ,filterItem}) => ({
                url:`inventory/product/filter?page=${page - 1}&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ['product']
        }),
        saveProduct: builder.mutation({
            query: (body) => ({
                url: 'inventory/product',
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['product']
        }),
        updateProduct: builder.mutation({
            query: (body) => ({
                url: `inventory/product`,
                method: 'PUT',
                body: body
            }),
            invalidatesTags: ['product']
        }),
        deleteProduct: builder.mutation({
            query: ( id ) => ({
                url: `inventory/product/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['product']
        }),
    })
})

export const {
    useGetAllProductListQuery,
    useSaveProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = ProductSlice