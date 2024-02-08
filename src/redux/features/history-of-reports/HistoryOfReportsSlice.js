import { apiSlice } from "../../api/apiSlice";

export const HistoryOfReportsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistoryOfReports: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `vehicle/machine-report/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&sort=time,${sort}&${filterItem}`,
      }),
      providesTags: ["history-of-reports"],
    }),
  }),
});

export const {useGetAllHistoryOfReportsQuery } = HistoryOfReportsSlice;
