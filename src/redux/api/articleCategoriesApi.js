import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const ARTICLE_CATEGORY_URL = "/article-categories";

export const skillsCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  article_categories
    createArticleCategories: build.mutation({
      query: (data) => ({
        url: `${ARTICLE_CATEGORY_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.article_categories],
    }),

    // Query for fetching all article_categories
    getAllArticleCategories: build.query({
      query: (arg) => ({
        url: `${ARTICLE_CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.article_categories],
    }),

    // Query for fetching a single article_categories by its ID
    getSingleArticleCategory: build.query({
      query: (id) => ({
        url: `${ARTICLE_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.article_categories],
    }),

    // Mutation for updating a single article_categories by its ID
    updateArticleCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${ARTICLE_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.article_categories],
    }),

    // Mutation for deleting a article_categories by its ID
    deleteArticleCategory: build.mutation({
      query: (id) => ({
        url: `${ARTICLE_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.article_categories],
    }),
  }),
});

export const {
  useCreateArticleCategoriesMutation,
  useGetAllArticleCategoriesQuery,
  useGetSingleArticleCategoryQuery,
  useUpdateArticleCategoryMutation,
  useDeleteArticleCategoryMutation,
} = skillsCategoryApi;
