import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EDUCTION_URL = "/education";

export const educationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  education
    createEducations: build.mutation({
      query: (data) => ({
        url: `${EDUCTION_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.education],
    }),

    // Query for fetching all education
    getAllEducations: build.query({
      query: (arg) => ({
        url: `${EDUCTION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.education],
    }),

    // Query for fetching a single education by its ID
    getSingleEducation: build.query({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.education],
    }),

    // Mutation for updating a single education by its ID
    updateEducation: build.mutation({
      query: ({ id, data }) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.education],
    }),

    // Mutation for deleting a education by its ID
    deleteEducation: build.mutation({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.education],
    }),
  }),
});

export const {
  useCreateEducationsMutation,
  useGetAllEducationsQuery,
  useGetSingleEducationQuery,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
