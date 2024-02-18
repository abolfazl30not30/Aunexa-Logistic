import { apiSlice } from "@/redux/api/apiSlice";

export const NewReportsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getAllNewReports: builder.mutation({
      query: ( body ) => ({
        url: `golgohar/report/filter`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["new-reports"],
    }),

    getAllGPSPoint: builder.mutation({
      query: (body) => ({
        url: `golgohar/gps/find-all/filter`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["new-reports"],
    }),


  }),
});

export const { useGetAllNewReportsMutation, useGetAllGPSPointMutation } = NewReportsSlice;
