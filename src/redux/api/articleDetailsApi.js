import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROJECT_DETAILS_URL = "/article-details";

export const articleDetailsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  article_details
    createArticleDetails: build.mutation({
      query: (data) => ({
        url: `${PROJECT_DETAILS_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.article_details],
    }),

    // Query for fetching all article_details
    getAllArticleDetails: build.query({
      query: (arg) => ({
        url: `${PROJECT_DETAILS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.article_details],
    }),

    // Query for fetching a single article_details by its ID
    getSingleArticleDetail: build.query({
      query: (id) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.article_details],
    }),

    // Mutation for updating a single article_details by its ID
    updateArticleDetail: build.mutation({
      query: ({ id, data }) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.article_details],
    }),

    // Mutation for deleting a article_details by its ID
    deleteArticleDetail: build.mutation({
      query: (id) => ({
        url: `${PROJECT_DETAILS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.article_details],
    }),
  }),
});

export const {
  useCreateArticleDetailsMutation,
  useGetAllArticleDetailsQuery,
  useGetSingleArticleDetailQuery,
  useUpdateArticleDetailMutation,
  useDeleteArticleDetailMutation,
} = articleDetailsApi;
