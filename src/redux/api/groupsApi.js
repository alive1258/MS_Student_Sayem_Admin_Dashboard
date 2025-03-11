import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const GROUPS_URL = "/groups";

export const groupsApi = baseApi.injectEndpoints({
  // overrideExisting: true,
  endpoints: (build) => ({
    // Mutation for creating a new  groups
    createGroups: build.mutation({
      query: (data) => ({
        url: `${GROUPS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.groups],
    }),

    // Query for fetching all groups
    getAllGroups: build.query({
      query: (arg) => ({
        url: `${GROUPS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.groups],
    }),

    // Query for fetching a single groups by its ID
    getSingleGroup: build.query({
      query: (id) => ({
        url: `${GROUPS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.groups],
    }),

    // Mutation for updating a single groups by its ID
    updateGroup: build.mutation({
      query: ({ id, data }) => ({
        url: `${GROUPS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.groups],
    }),

    // Mutation for deleting a groups by its ID
    deleteGroup: build.mutation({
      query: (id) => ({
        url: `${GROUPS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.groups],
    }),
  }),
});

export const {
  useCreateGroupsMutation,
  useGetAllGroupsQuery,
  useGetSingleGroupQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
