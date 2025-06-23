import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COLLABORATE_URL = "/collaborate";

export const collaborateApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  collaborate
    createCollaborate: build.mutation({
      query: (data) => ({
        url: `${COLLABORATE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.collaborate],
    }),

    // Query for fetching all collaborate
    getAllCollaborate: build.query({
      query: (arg) => ({
        url: `${COLLABORATE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.collaborate],
    }),

    // Query for fetching a single collaborate by its ID
    getSingleCollaborate: build.query({
      query: (id) => ({
        url: `${COLLABORATE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.collaborate],
    }),

    // Mutation for updating a single collaborate by its ID
    updateCollaborate: build.mutation({
      query: ({ id, data }) => ({
        url: `${COLLABORATE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.collaborate],
    }),

    // Mutation for deleting a collaborate by its ID
    deleteCollaborate: build.mutation({
      query: (id) => ({
        url: `${COLLABORATE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.collaborate],
    }),
  }),
});

export const {
  useCreateCollaborateMutation,
  useGetAllCollaborateQuery,
  useGetSingleCollaborateQuery,
  useUpdateCollaborateMutation,
  useDeleteCollaborateMutation,
} = collaborateApi;
