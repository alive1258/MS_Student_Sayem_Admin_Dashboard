import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SNAPSHOTS_URL = "/snapshots";

export const snapshotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  snapshot
    createSnapshots: build.mutation({
      query: (data) => ({
        url: `${SNAPSHOTS_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.snapshots],
    }),

    // Query for fetching all snapshot
    getAllSnapshots: build.query({
      query: (arg) => ({
        url: `${SNAPSHOTS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.snapshots],
    }),

    // Query for fetching a single snapshot by its ID
    getSingleSnapshot: build.query({
      query: (id) => ({
        url: `${SNAPSHOTS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.snapshots],
    }),

    // Mutation for updating a single snapshot by its ID
    updateSnapshot: build.mutation({
      query: ({ id, data }) => ({
        url: `${SNAPSHOTS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.snapshots],
    }),

    // Mutation for deleting a snapshot by its ID
    deleteSnapshot: build.mutation({
      query: (id) => ({
        url: `${SNAPSHOTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.snapshots],
    }),
  }),
});

export const {
  useCreateSnapshotsMutation,
  useGetAllSnapshotsQuery,
  useGetSingleSnapshotQuery,
  useUpdateSnapshotMutation,
  useDeleteSnapshotMutation,
} = snapshotApi;
