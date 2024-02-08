import { apiSlice } from "../../../api/apiSlice";

export const SubOrganizationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveSubOrganization: builder.mutation({
      query: (body) => ({
        url: "party/sub-organization",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    updateSubOrganization: builder.mutation({
      query: (body) => ({
        url: `party/sub-organization`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    deleteSubOrganization: builder.mutation({
      query: (id) => ({
        url: `party/sub-organization/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const { useSaveSubOrganizationMutation, useUpdateSubOrganizationMutation, useDeleteSubOrganizationMutation } =
  SubOrganizationSlice;
