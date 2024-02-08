import { apiSlice } from "../../api/apiSlice";

export const FileSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    downloadFileMinio: builder.query({
      query: (name) => ({
        url: `file/download/${name}`,
      }),
      providesTags: ["file"],
    }),

    uploadFileCloud: builder.mutation({
      query: (body) => ({
        url: "file/ftp-upload",
        method: "POST",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["file"],
    }),
    uploadFileMinio: builder.mutation({
      query: (body) => ({
        url: "file/upload",
        method: "POST",
        body: body,
        formData: true,
      }),
      invalidatesTags: ["file"],
    }),
    deleteFileMinio: builder.mutation({
      query: (name) => ({
        url: `file/remove/${name}`,
        method: "DELETE",
        body: name,
      }),
      invalidatesTags: ["file"],
    }),
  }),
});

export const {
  useLazyDownloadFileMinioQuery,
  useUploadFileCloudMutation,
  useUploadFileMinioMutation,
  useDeleteFileMinioMutation,
} = FileSlice;
