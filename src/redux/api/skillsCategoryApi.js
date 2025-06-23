import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const SKILLS_CATEGORY_URL = "/skills-category";

export const skillsCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  skills_category
    createSkillsCategories: build.mutation({
      query: (data) => ({
        url: `${SKILLS_CATEGORY_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.skills_category],
    }),

    // Query for fetching all skills_category
    getAllSkillsCategories: build.query({
      query: (arg) => ({
        url: `${SKILLS_CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.skills_category],
    }),

    // Query for fetching a single skills_category by its ID
    getSingleSkillsCategory: build.query({
      query: (id) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.skills_category],
    }),

    // Mutation for updating a single skills_category by its ID
    updateSkillsCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.skills_category],
    }),

    // Mutation for deleting a skills_category by its ID
    deleteSkillsCategory: build.mutation({
      query: (id) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skills_category],
    }),
  }),
});

export const {
  useCreateSkillsCategoriesMutation,
  useGetAllSkillsCategoriesQuery,
  useGetSingleSkillsCategoryQuery,
  useUpdateSkillsCategoryMutation,
  useDeleteSkillsCategoryMutation,
} = skillsCategoryApi;
