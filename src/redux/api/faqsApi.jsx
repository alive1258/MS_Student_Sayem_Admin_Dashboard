import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FAQS_URL = "/faqs";

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  faqs
    createFaqs: build.mutation({
      query: (data) => ({
        url: `${FAQS_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.faqs],
    }),

    // Query for fetching all faqs
    getAllFaqs: build.query({
      query: (arg) => ({
        url: `${FAQS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.faqs],
    }),

    // Query for fetching a single faqs by its ID
    getSingleFaq: build.query({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faqs],
    }),

    // Mutation for updating a single faqs by its ID
    updateFaq: build.mutation({
      query: ({ id, data }) => ({
        url: `${FAQS_URL}/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.faqs],
    }),

    // Mutation for deleting a faqs by its ID
    deleteFaq: build.mutation({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faqs],
    }),
  }),
});

export const {
  useCreateFaqsMutation,
  useGetAllFaqsQuery,
  useGetSingleFaqQuery,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApi;
