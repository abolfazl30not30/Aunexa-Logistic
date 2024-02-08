import { apiSlice } from "@/redux/api/apiSlice";

export const UnsuccessfulPurchaseRequestListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUnsuccessfulPurchaseRequestList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/bill-cycle/filter?status=FAIL&page=${
          page - 1
        }&size=10&sort=requestDate,${sort}&sort=requestTime,${sort}&${filterItem}`,
      }),
      providesTags: ["unsuccessful-purchase-request-list"],
    }),
  }),
});

export const { useGetAllUnsuccessfulPurchaseRequestListQuery } =
  UnsuccessfulPurchaseRequestListSlice;
