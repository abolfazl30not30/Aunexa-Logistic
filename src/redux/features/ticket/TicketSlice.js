import { apiSlice } from "@/redux/api/apiSlice";

export const ticketSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllSourceTickets: builder.query({
      query: ({ page, openTicket }) => ({
        url: `party/ticket/filter?isClosed=${openTicket}&sourceDepartmentId=${window.sessionStorage.getItem(
          "subOrganizationId"
        )}&page=${page - 1}&size=10`,
      }),
      providesTags: ["ticket"],
    }),
    getAllTargetTickets: builder.query({
      query: ({ page, openTicket }) => ({
        url: `party/ticket/filter?isClosed=${openTicket}&targetDepartmentId=${window.sessionStorage.getItem(
          "subOrganizationId"
        )}&page=${page - 1}&size=10`,
      }),
      providesTags: ["ticket"],
    }),

    saveTicket: builder.mutation({
      query: (body) => ({
        url: "party/ticket",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
    updateTicket: builder.mutation({
      query: (body) => ({
        url: "party/ticket",
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const {
  useGetAllSourceTicketsQuery,
  useGetAllTargetTicketsQuery,
  useSaveTicketMutation,
  useUpdateTicketMutation,
} = ticketSlice;
