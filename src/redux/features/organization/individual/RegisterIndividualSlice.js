import { apiAuthServerSlice } from "@/redux/api/apiAuthServerSlice";

export const codeslice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveCode: builder.mutation({
      query: (body) => ({
        url: `register/code`,
        method: "POST",
        body: new URLSearchParams(body),
      }),
      invalidatesTags: ["code"],
    }),
    saveRegisterIndividual: builder.mutation({
      query: (body) => ({
        url: `register/save-user`,
        method: "POST",
        body: new URLSearchParams(body),
      }),
      invalidatesTags: ["save-user"],
    }),
  }),
});

export const { useSaveCodeMutation, useSaveRegisterIndividualMutation } =
  codeslice;
