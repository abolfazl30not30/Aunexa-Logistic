import { apiSlice } from "../../../api/apiSlice";

export const IndividualSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveIndividual: builder.mutation({
      query: (body) => ({
        url: "party/individual",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    updateIndividual: builder.mutation({
      query: (body) => ({
        url: `party/individual`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["organization"],
    }),
    deleteIndividual: builder.mutation({
      query: (id) => ({
        url: `party/individual/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["organization"],
    }),
  }),
});

export const {
  useSaveIndividualMutation,
  useUpdateIndividualMutation,
  useDeleteIndividualMutation,
} = IndividualSlice;
