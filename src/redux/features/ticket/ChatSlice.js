import { apiSlice } from "@/redux/api/apiSlice";

export const chatSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllChats: builder.query({
      query: ({ ticketId }) => ({
        url: `party/message/find-all/${ticketId}`,
      }),
      providesTags: ["ticket"],
    }),

    saveChat: builder.mutation({
      query: (body) => ({
        url: "party/message",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["ticket"],
    }),
  }),
});

export const { useGetAllChatsQuery, useSaveChatMutation } = chatSlice;
