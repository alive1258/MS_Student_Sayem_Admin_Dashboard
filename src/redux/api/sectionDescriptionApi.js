import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const EDUCTION_URL = "/section-description";

export const sectionDescriptionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  section_description
    createSectionDescriptions: build.mutation({
      query: (data) => ({
        url: `${EDUCTION_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.section_description],
    }),

    // Query for fetching all section_description
    getAllSectionDescriptions: build.query({
      query: (arg) => ({
        url: `${EDUCTION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.section_description],
    }),

    // Query for fetching a single section_description by its ID
    getSingleSectionDescription: build.query({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.section_description],
    }),

    // Mutation for updating a single section_description by its ID
    updateSectionDescription: build.mutation({
      query: ({ id, data }) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.section_description],
    }),

    // Mutation for deleting a section_description by its ID
    deleteSectionDescription: build.mutation({
      query: (id) => ({
        url: `${EDUCTION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.section_description],
    }),
  }),
});

export const {
  useCreateSectionDescriptionsMutation,
  useGetAllSectionDescriptionsQuery,
  useGetSingleSectionDescriptionQuery,
  useUpdateSectionDescriptionMutation,
  useDeleteSectionDescriptionMutation,
} = sectionDescriptionApi;
