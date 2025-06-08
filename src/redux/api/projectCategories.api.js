import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROJECT_CATEGORY_URL = "/project-categories";

export const projectCategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  project_categories
    createProjectCategories: build.mutation({
      query: (data) => ({
        url: `${PROJECT_CATEGORY_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.project_categories],
    }),

    // Query for fetching all project_categories
    getAllProjectCategories: build.query({
      query: (arg) => ({
        url: `${PROJECT_CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.project_categories],
    }),

    // Query for fetching a single project_categories by its ID
    getSingleProjectCategory: build.query({
      query: (id) => ({
        url: `${PROJECT_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.project_categories],
    }),

    // Mutation for updating a single project_categories by its ID
    updateProjectCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${PROJECT_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.project_categories],
    }),

    // Mutation for deleting a project_categories by its ID
    deleteProjectCategory: build.mutation({
      query: (id) => ({
        url: `${PROJECT_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.project_categories],
    }),
  }),
});

export const {
  useCreateProjectCategoriesMutation,
  useGetAllProjectCategoriesQuery,
  useGetSingleProjectCategoryQuery,
  useUpdateProjectCategoryMutation,
  useDeleteProjectCategoryMutation,
} = projectCategoriesApi;
