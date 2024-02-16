import { apiSlice } from "../../api/apiSlice";

export const TrackingSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllTrackingMachineList: builder.query({
            query: ({  filterItem }) => ({
                url: `party/organization/fleet/filter?${filterItem}`,
            }),
            providesTags: ["tracking"],
        }),


    }),
});

export const {
    useGetAllTrackingMachineListQuery,
} = TrackingSlice;

