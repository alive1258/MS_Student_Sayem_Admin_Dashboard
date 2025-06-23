import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FAQS_URL = "/extra-curriculum";

export const extraCurriculumApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  extra_curriculum
    createExtraCurriculums: build.mutation({
      query: (data) => ({
        url: `${FAQS_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.extra_curriculum],
    }),

    // Query for fetching all extra_curriculum
    getAllExtraCurriculums: build.query({
      query: (arg) => ({
        url: `${FAQS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.extra_curriculum],
    }),

    // Query for fetching a single extra_curriculum by its ID
    getSingleExtraCurriculum: build.query({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.extra_curriculum],
    }),

    // Mutation for updating a single extra_curriculum by its ID
    updateExtraCurriculum: build.mutation({
      query: ({ id, data }) => ({
        url: `${FAQS_URL}/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.extra_curriculum],
    }),

    // Mutation for deleting a extra_curriculum by its ID
    deleteExtraCurriculum: build.mutation({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.extra_curriculum],
    }),
  }),
});

export const {
  useCreateExtraCurriculumsMutation,
  useGetAllExtraCurriculumsQuery,
  useGetSingleExtraCurriculumQuery,
  useUpdateExtraCurriculumMutation,
  useDeleteExtraCurriculumMutation,
} = extraCurriculumApi;
