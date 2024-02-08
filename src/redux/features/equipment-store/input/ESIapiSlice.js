import { apiSlice } from "../../../api/apiSlice";

export const ESIapiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllESI: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `inventory/store-input/equipment/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["equipment-store-input"],
    }),
    saveESI: builder.mutation({
      query: (body) => ({
        url: "inventory/store-input/equipment",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["equipment-store-input"],
    }),
    updateESI: builder.mutation({
      query: (body) => ({
        url: `inventory/store-input/equipment`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["equipment-store-input"],
    }),
    deleteESI: builder.mutation({
      query: (id) => ({
        url: `inventory/store-input/equipment/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["equipment-store-input"],
    }),
  }),
});

export const {
  useGetAllESIQuery,
  useSaveESIMutation,
  useUpdateESIMutation,
  useDeleteESIMutation,
} = ESIapiSlice;
