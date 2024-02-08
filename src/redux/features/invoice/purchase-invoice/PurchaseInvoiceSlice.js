import { apiSlice } from "../../../api/apiSlice";

export const PurchaseInvoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllPurchaseInvoice: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/payment/filter?page=${
          page - 1
        }&size=10&sort=purchaseDate,${sort}&sort=purchaseTime,${sort}&${filterItem}`,
      }),
      providesTags: ["purchase-invoice"],
    }),
    updatePurchaseInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/payment`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["purchase-invoice"],
    }),
    acceptPurchaseInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/payment/accept`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["purchase-invoice"],
    }),
    rejectPurchaseInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/payment/reject`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["purchase-invoice"],
    }),
  }),
});

export const {
  useGetAllPurchaseInvoiceQuery,
  useUpdatePurchaseInvoiceMutation,
  useAcceptPurchaseInvoiceMutation,
  useRejectPurchaseInvoiceMutation,
} = PurchaseInvoiceSlice;
