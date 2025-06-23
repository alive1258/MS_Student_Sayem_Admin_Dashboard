import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const RESEARCH_AND_PUBLICATION_URL = "/research-and-publications";

export const researchAndPublicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  research_and_publications
    createResearchAndPublications: build.mutation({
      query: (data) => ({
        url: `${RESEARCH_AND_PUBLICATION_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.research_and_publications],
    }),

    // Query for fetching all research_and_publications
    getAllResearchAndPublications: build.query({
      query: (arg) => ({
        url: `${RESEARCH_AND_PUBLICATION_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.research_and_publications],
    }),

    // Query for fetching a single research_and_publications by its ID
    getSingleResearchAndPublication: build.query({
      query: (id) => ({
        url: `${RESEARCH_AND_PUBLICATION_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.research_and_publications],
    }),

    // Mutation for updating a single research_and_publications by its ID
    updateResearchAndPublication: build.mutation({
      query: ({ id, data }) => ({
        url: `${RESEARCH_AND_PUBLICATION_URL}/${id}`,
        method: "PATCH",
        contentType: "multipart/form-data",
        data,
      }),
      invalidatesTags: [tagTypes.research_and_publications],
    }),

    // Mutation for deleting a research_and_publications by its ID
    deleteResearchAndPublication: build.mutation({
      query: (id) => ({
        url: `${RESEARCH_AND_PUBLICATION_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.research_and_publications],
    }),
  }),
});

export const {
  useCreateResearchAndPublicationsMutation,
  useGetAllResearchAndPublicationsQuery,
  useGetSingleResearchAndPublicationQuery,
  useUpdateResearchAndPublicationMutation,
  useDeleteResearchAndPublicationMutation,
} = researchAndPublicationApi;
