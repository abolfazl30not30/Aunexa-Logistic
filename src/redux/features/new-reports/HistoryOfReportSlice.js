import { apiSlice } from "@/redux/api/apiSlice";

export const HistoryOfReportSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistoryOfReport: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/report-history/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["report-history"],
    }),

    saveNewReports: builder.mutation({
      query: (body) => ({
        url: "vehicle/report-history",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["report-history"],
    }),

  }),
});

export const { useSaveNewReportsMutation,useGetAllHistoryOfReportQuery } = HistoryOfReportSlice;
