import { apiSlice } from "../../api/apiSlice";

export const VehiclesAndEquipmentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllVehicles: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/machine/filter?page=${
          page - 1
        }&size=10&sort=purchaseDate,${sort}&${filterItem}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
    saveVehicles: builder.mutation({
      query: (body) => ({
        url: "vehicle/machine",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    updateVehicles: builder.mutation({
      query: (body) => ({
        url: `vehicle/machine`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    deleteVehicles: builder.mutation({
      query: (id) => ({
        url: `vehicle/machine/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["vehicle-machine"],
    }),
    getOneVehiclesByTag: builder.query({
      query: (tag) => ({
        url: `vehicle/machine/tag/${tag}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
    getOneVehiclesByCode: builder.query({
      query: (code) => ({
        url: `vehicle/machine/code/${code}`,
      }),
      providesTags: ["vehicle-machine"],
    }),
  }),
});

export const {
  useGetAllVehiclesQuery,
  useSaveVehiclesMutation,
  useUpdateVehiclesMutation,
  useDeleteVehiclesMutation,
  useLazyGetOneVehiclesByTagQuery,
  useLazyGetOneVehiclesByCodeQuery,
} = VehiclesAndEquipmentSlice;
