import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EDUCTION_URL = "/about-me";

export const aboutMeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  about_me
    createAboutMe: build.mutation({
      query: (data) => ({
        url: `${EDUCTION_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.about_me],
    }),

    // Query for fetching all about_me
    getAllAboutMe: build.query({
      query: (arg) => ({
        url: `${EDUCTION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.about_me],
    }),

    // Query for fetching a single about_me by its ID
    getSingleAboutMe: build.query({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about_me],
    }),

    // Mutation for updating a single about_me by its ID
    updateAboutMe: build.mutation({
      query: ({ id, data }) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.about_me],
    }),

    // Mutation for deleting a about_me by its ID
    deleteAboutMe: build.mutation({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.about_me],
    }),
  }),
});

export const {
  useCreateAboutMeMutation,
  useGetAllAboutMeQuery,
  useGetSingleAboutMeQuery,
  useUpdateAboutMeMutation,
  useDeleteAboutMeMutation,
} = aboutMeApi;
