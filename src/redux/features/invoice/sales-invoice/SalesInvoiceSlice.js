import { apiSlice } from "../../../api/apiSlice";

export const SalesInvoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSalesInvoice: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `bill/invoice/filter?page=${
          page - 1
        }&size=10&sort=salesDate,${sort}&sort=salesTime,${sort}&${filterItem}`,
      }),
      providesTags: ["sales-invoice"],
    }),
    updateSalesInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/invoice`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sales-invoice"],
    }),
    acceptSalesInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/invoice/accept`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sales-invoice"],
    }),
    rejectSalesInvoice: builder.mutation({
      query: (body) => ({
        url: `bill/invoice/reject`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["sales-invoice"],
    }),
  }),
});

export const {
  useGetAllSalesInvoiceQuery,
  useUpdateSalesInvoiceQuery,
  useAcceptSalesInvoiceMutation,
  useRejectSalesInvoiceMutation,
} = SalesInvoiceSlice;
