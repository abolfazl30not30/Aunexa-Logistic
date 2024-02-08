import { apiSlice } from "../../api/apiSlice";

export const FleetSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFleetList: builder.query({
      query: ({ page }) => ({
        url: `party/organization/fleet/?page=${page - 1}&size=10`,
      }),
      providesTags: ["fleet"],
    }),
  }),
});

export const { useGetAllFleetListQuery } = FleetSlice;
