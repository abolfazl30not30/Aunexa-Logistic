import { apiSlice } from "@/redux/api/apiSlice";

export const SuccessfulPurchaseRequestListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSuccessfulPurchaseRequestList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/payment/filter?page=${
          page - 1
        }&size=10&sort=purchaseDate,${sort}&sort=purchaseTime,${sort}&${filterItem}`,
      }),
      providesTags: ["successful-purchase-request-list"],
    }),
  }),
});

export const { useGetAllSuccessfulPurchaseRequestListQuery } =
  SuccessfulPurchaseRequestListSlice;
