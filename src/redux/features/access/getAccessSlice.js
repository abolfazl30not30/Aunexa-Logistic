
import {apiAuthServerSlice} from "@/redux/api/apiAuthServerSlice";

export const getAccessSlice = apiAuthServerSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccess: builder.query({
      query: () => ({
        url: `roles/validate`,
      }),
      providesTags: ["access"],
    }),
  }),
});

export const { useLazyGetAccessQuery } = getAccessSlice;
