import { apiSlice } from "../../../api/apiSlice";

export const IndividualRelationshipSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveRelationship: builder.mutation({
      query: (body) => ({
        url: "party/relationship-information/bulk",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    updateRelationship: builder.mutation({
      query: (body) => ({
        url: `party/relationship-information/bulk`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    deleteRelationship: builder.mutation({
      query: (id) => ({
        url: `party/relationship-information${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const {
  useSaveRelationshipMutation,
  useUpdateRelationshipMutation,
  useDeleteRelationshipMutation,
} = IndividualRelationshipSlice;
