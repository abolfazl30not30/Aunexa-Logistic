import { apiSlice } from "../../api/apiSlice";

export const NotificationCounterDashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCounterOfDashboardNotification: builder.query({
      query: () => ({
        url: `notification/machine/count`,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useLazyGetCounterOfDashboardNotificationQuery } =
  NotificationCounterDashboardSlice;
