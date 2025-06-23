import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const EXTRA_CURRICULUM_CATEGORIES_URL = "/extra-curriculum-categories";

export const extraCurriculumCategoriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  extra_curriculum_categories
    createExtraCurriculumCategories: build.mutation({
      query: (data) => ({
        url: `${EXTRA_CURRICULUM_CATEGORIES_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.extra_curriculum_categories],
    }),

    // Query for fetching all extra_curriculum_categories
    getAllExtraCurriculumCategories: build.query({
      query: (arg) => ({
        url: `${EXTRA_CURRICULUM_CATEGORIES_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.extra_curriculum_categories],
    }),

    // Query for fetching a single extra_curriculum_categories by its ID
    getSingleExtraCurriculumCategory: build.query({
      query: (id) => ({
        url: `${EXTRA_CURRICULUM_CATEGORIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.extra_curriculum_categories],
    }),

    // Mutation for updating a single extra_curriculum_categories by its ID
    updateExtraCurriculumCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${EXTRA_CURRICULUM_CATEGORIES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.extra_curriculum_categories],
    }),

    // Mutation for deleting a extra_curriculum_categories by its ID
    deleteExtraCurriculumCategory: build.mutation({
      query: (id) => ({
        url: `${EXTRA_CURRICULUM_CATEGORIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.extra_curriculum_categories],
    }),
  }),
});

export const {
  useCreateExtraCurriculumCategoriesMutation,
  useGetAllExtraCurriculumCategoriesQuery,
  useGetSingleExtraCurriculumCategoryQuery,
  useUpdateExtraCurriculumCategoryMutation,
  useDeleteExtraCurriculumCategoryMutation,
} = extraCurriculumCategoriesApi;
