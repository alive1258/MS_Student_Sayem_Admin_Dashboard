import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const COLLABORATING_URL = "/collaborating";

export const collaboratingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  collaborating
    createCollaborating: build.mutation({
      query: (data) => ({
        url: `${COLLABORATING_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.collaborating],
    }),

    // Query for fetching all collaborating
    getAllCollaborating: build.query({
      query: (arg) => ({
        url: `${COLLABORATING_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.collaborating],
    }),

    // Query for fetching a single collaborating by its ID
    getSingleCollaborating: build.query({
      query: (id) => ({
        url: `${COLLABORATING_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.collaborating],
    }),

    // Mutation for updating a single collaborating by its ID
    updateCollaborating: build.mutation({
      query: ({ id, data }) => ({
        url: `${COLLABORATING_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.collaborating],
    }),

    // Mutation for deleting a collaborating by its ID
    deleteCollaborating: build.mutation({
      query: (id) => ({
        url: `${COLLABORATING_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.collaborating],
    }),
  }),
});

export const {
  useCreateCollaboratingMutation,
  useGetAllCollaboratingQuery,
  useGetSingleCollaboratingQuery,
  useUpdateCollaboratingMutation,
  useDeleteCollaboratingMutation,
} = collaboratingApi;
