import { apiSlice } from "../../api/apiSlice";

export const NotificationCounterSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounterOfNotification: builder.query({
      query: () => ({
        url: `notification/panel/count`,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useLazyGetCounterOfNotificationQuery } =
  NotificationCounterSlice;
