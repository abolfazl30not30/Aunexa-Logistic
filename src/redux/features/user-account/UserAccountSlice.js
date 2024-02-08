import { apiSlice } from "../../api/apiSlice";

export const UserAccountSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserAccount: builder.query({
      query: () => ({
        url: `party/individual/${sessionStorage.getItem("individualId")}`,
      }),
      providesTags: ["user-account"],
    }),
    // saveProduct: builder.mutation({
    //     query: (body) => ({
    //         url: 'inventory/product',
    //         method: 'POST',
    //         body: body
    //     }),
    //     invalidatesTags: ['product']
    // }),
    // updateProduct: builder.mutation({
    //     query: (body) => ({
    //         url: `inventory/product`,
    //         method: 'PUT',
    //         body: body
    //     }),
    //     invalidatesTags: ['product']
    // }),
    // deleteProduct: builder.mutation({
    //     query: ( id ) => ({
    //         url: `inventory/product/${id}`,
    //         method: 'DELETE',
    //         body: id
    //     }),
    //     invalidatesTags: ['product']
    // }),
  }),
});

export const { useGetUserAccountQuery } = UserAccountSlice;
