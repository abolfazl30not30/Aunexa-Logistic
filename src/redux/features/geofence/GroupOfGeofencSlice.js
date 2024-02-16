import { apiSlice } from "../../api/apiSlice";

export const GroupOfGeofenceSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGroup: builder.query({
            query: ({ page, sort, filterItem }) => ({
                url: `golgohar/geofence-group/filter?page=${
                    page - 1
                }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
            }),
            providesTags: ["geofenceGroup"],
        }),
        getAllGroupList: builder.query({
            query: () => ({
                url: `golgohar/geofence-group/find-all`,
            }),
            providesTags: ["geofenceGroup"],
        }),
        saveGroup: builder.mutation({
            query: (body) => ({
                url: "golgohar/geofence-group",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["geofenceGroup"],
        }),
        updateGroup: builder.mutation({
            query: (body) => ({
                url: `golgohar/geofence-group`,
                method: "PUT",
                body: body,
            }),
            invalidatesTags: ["geofenceGroup"],
        }),
        deleteGroup: builder.mutation({
            query: (id) => ({
                url: `golgohar/geofence-grou/${id}`,
                method: "DELETE",
                body: id,
            }),
            invalidatesTags: ["geofenceGroup"],
        }),
    }),
});

export const {
    useGetAllGroupListQuery,
    useGetAllGroupQuery,
    useSaveGroupMutation,
    useUpdateGroupMutation,
    useDeleteGroupMutation,
} = GroupOfGeofenceSlice;
