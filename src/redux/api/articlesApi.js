import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const ARTICLE_URL = "/articles";

export const projectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  articles
    createArticles: build.mutation({
      query: (data) => ({
        url: `${ARTICLE_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.articles],
    }),

    // Query for fetching all articles
    getAllArticles: build.query({
      query: (arg) => ({
        url: `${ARTICLE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.articles],
    }),

    // Query for fetching a single articles by its ID
    getSingleArticle: build.query({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.articles],
    }),

    // Mutation for updating a single articles by its ID
    updateArticle: build.mutation({
      query: ({ id, data }) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.articles],
    }),

    // Mutation for deleting a articles by its ID
    deleteArticle: build.mutation({
      query: (id) => ({
        url: `${ARTICLE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.articles],
    }),
  }),
});

export const {
  useCreateArticlesMutation,
  useGetAllArticlesQuery,
  useGetSingleArticleQuery,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = projectApi;
