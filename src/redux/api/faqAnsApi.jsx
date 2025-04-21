import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FAQ_ANSWERS_URL = "/faq-ans";

export const faqAnswersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  faq_answers
    createFaqAnswers: build.mutation({
      query: (data) => ({
        url: `${FAQ_ANSWERS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq_answers],
    }),

    // Query for fetching all faq_answers
    getAllFaqAnswers: build.query({
      query: (arg) => ({
        url: `${FAQ_ANSWERS_URL}/all-faq-ans`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.faq_answers],
    }),

    // Query for fetching a single faq_answers by its ID
    getSingleFaqAnswer: build.query({
      query: (id) => ({
        url: `${FAQ_ANSWERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq_answers],
    }),

    // Mutation for updating a single faq_answers by its ID
    updateFaqAnswer: build.mutation({
      query: ({ id, data }) => ({
        url: `${FAQ_ANSWERS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.faq_answers],
    }),

    // Mutation for deleting a faq_answers by its ID
    deleteFaqAnswer: build.mutation({
      query: (id) => ({
        url: `${FAQ_ANSWERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq_answers],
    }),
  }),
});

export const {
  useCreateFaqAnswersMutation,
  useGetAllFaqAnswersQuery,
  useGetSingleFaqAnswerQuery,
  useUpdateFaqAnswerMutation,
  useDeleteFaqAnswerMutation,
} = faqAnswersApi;
