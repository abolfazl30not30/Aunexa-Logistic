import { apiSlice } from "../../api/apiSlice";

export const NotificationDashboardSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationDashboardList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `notification/machine/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&${filterItem}`,
      }),
      providesTags: ["notification"],
    }),
    getCheckAllNotificationDashboardList: builder.query({
      query: () => ({
        url: `notification/machine/check-all`,
      }),
    }),
    providesTags: ["notification"],
    getLastFiveNotificationDashboardList: builder.query({
      query: () => ({
        url: `notification/machine/panel/find-all`,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationDashboardListQuery,
  useLazyGetLastFiveNotificationDashboardListQuery,
  useGetCheckAllNotificationDashboardListQuery,
} = NotificationDashboardSlice;
