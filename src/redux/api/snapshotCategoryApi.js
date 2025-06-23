import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";
const SKILLS_CATEGORY_URL = "/snapshots-category";

export const snapshotsCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  snapshots_category
    createSnapshotsCategories: build.mutation({
      query: (data) => ({
        url: `${SKILLS_CATEGORY_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.snapshots_category],
    }),

    // Query for fetching all snapshots_category
    getAllSnapshotsCategories: build.query({
      query: (arg) => ({
        url: `${SKILLS_CATEGORY_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.snapshots_category],
    }),

    // Query for fetching a single snapshots_category by its ID
    getSingleSnapshotsCategory: build.query({
      query: (id) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.snapshots_category],
    }),

    // Mutation for updating a single snapshots_category by its ID
    updateSnapshotsCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.snapshots_category],
    }),

    // Mutation for deleting a snapshots_category by its ID
    deleteSnapshotsCategory: build.mutation({
      query: (id) => ({
        url: `${SKILLS_CATEGORY_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.snapshots_category],
    }),
  }),
});

export const {
  useCreateSnapshotsCategoriesMutation,
  useGetAllSnapshotsCategoriesQuery,
  useGetSingleSnapshotsCategoryQuery,
  useUpdateSnapshotsCategoryMutation,
  useDeleteSnapshotsCategoryMutation,
} = snapshotsCategoryApi;
