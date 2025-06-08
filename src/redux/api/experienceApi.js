import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EDUCTION_URL = "/experience";

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  experience
    createExperiences: build.mutation({
      query: (data) => ({
        url: `${EDUCTION_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.experience],
    }),

    // Query for fetching all experience
    getAllExperiences: build.query({
      query: (arg) => ({
        url: `${EDUCTION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.experience],
    }),

    // Query for fetching a single experience by its ID
    getSingleExperience: build.query({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.experience],
    }),

    // Mutation for updating a single experience by its ID
    updateExperience: build.mutation({
      query: ({ id, data }) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.experience],
    }),

    // Mutation for deleting a experience by its ID
    deleteExperience: build.mutation({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.experience],
    }),
  }),
});

export const {
  useCreateExperiencesMutation,
  useGetAllExperiencesQuery,
  useGetSingleExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
