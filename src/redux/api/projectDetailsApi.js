import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROJECT_DETAILS_URL = "/project-details";

export const projectDetailsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  project_details
    createProjectDetailDetails: build.mutation({
      query: (data) => ({
        url: `${PROJECT_DETAILS_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.project_details],
    }),

    // Query for fetching all project_details
    getAllProjectDetailDetails: build.query({
      query: (arg) => ({
        url: `${PROJECT_DETAILS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.project_details],
    }),

    // Query for fetching a single project_details by its ID
    getSingleProjectDetail: build.query({
      query: (id) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.project_details],
    }),

    // Mutation for updating a single project_details by its ID
    updateProjectDetail: build.mutation({
      query: ({ id, data }) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.project_details],
    }),

    // Mutation for deleting a project_details by its ID
    deleteProjectDetail: build.mutation({
      query: (id) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.project_details],
    }),
  }),
});

export const {
  useCreateProjectDetailDetailsMutation,
  useGetAllProjectDetailDetailsQuery,
  useGetSingleProjectDetailQuery,
  useUpdateProjectDetailMutation,
  useDeleteProjectDetailMutation,
} = projectDetailsApi;
