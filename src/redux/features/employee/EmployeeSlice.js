import { apiSlice } from "@/redux/api/apiSlice";

export const EmployeeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOneOrganization: builder.query({
      query: ({ filterItem, filter }) => ({
        url: `party/organization/${window.sessionStorage.getItem(
          "organizationId"
        )}`,
      }),
      providesTags: ["organization"],
    }),
  }),
});

export const { useGetOneOrganizationQuery } = EmployeeSlice;
