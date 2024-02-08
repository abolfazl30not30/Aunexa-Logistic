import { apiSlice } from "../../api/apiSlice";

export const NotificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllNotificationList: builder.query({
      query: ({ page, sort, filterItem }) => ({
        url: `notification/filter?page=${
          page - 1
        }&size=10&sort=date,${sort}&${filterItem}&subOrganizationId=${window.sessionStorage.getItem(
          "subOrganizationId"
        )}`,
      }),
      providesTags: ["notification"],
    }),
    getCheckAllNotificationList: builder.query({
      query: () => ({
        url: `notification/check-all`,
      }),
    }),
    providesTags: ["notification"],
    getLastFiveNotificationList: builder.query({
      query: () => ({
        url: `notification/panel/find-all`,
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const {
  useGetAllNotificationListQuery,
  useLazyGetLastFiveNotificationListQuery,
  useGetCheckAllNotificationListQuery,
} = NotificationSlice;
