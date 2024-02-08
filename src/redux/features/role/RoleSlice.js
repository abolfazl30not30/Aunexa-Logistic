import {apiAuthServerSlice} from "@/redux/api/apiAuthServerSlice";

export const RoleSlice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: ({ page,searchRole }) => ({
        url: `roles/filter?page=${page - 1}&size=20&role=${searchRole}`,
      }),
      providesTags: ["role"],
    }),
    getPageAccess: builder.query({
      query: () => ({
        url: `roles/pages`,
      }),
      providesTags: ["role"],
    }),
    saveRole: builder.mutation({
      query: (body) => ({
        url: "roles/create",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: (body) => ({
        url: `roles`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
    deleteRole: builder.mutation({
      query: (body) => ({
        url: `roles`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const {
  useGetAllRolesQuery,
  useLazyGetPageAccessQuery,
  useSaveRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = RoleSlice;
