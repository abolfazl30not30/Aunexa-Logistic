import { apiSlice } from "../../api/apiSlice";

export const TrackingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTrackingMachineList: builder.query({
            query: ({  filterItem }) => ({
                url: `party/organization/fleet/filter?${filterItem}`,
            }),
            providesTags: ["tracking"],
        }),
        getLastPosition: builder.query({
            query: () => ({
                url: `golgohar/gps/last-position`,
            }),
            providesTags: ["tracking"],
        }),

    }),
});

export const {
    useGetAllTrackingMachineListQuery,
    useLazyGetLastPositionQuery
} = TrackingSlice;

