import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const GROUP_TYPES_URL = "/group-types";

export const groupTypesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  group_types
    createGroupTypes: build.mutation({
      query: (data) => ({
        url: `${GROUP_TYPES_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.group_types],
    }),

    // Query for fetching all group_types
    getAllGroupTypes: build.query({
      query: (arg) => ({
        url: `${GROUP_TYPES_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.group_types],
    }),

    // Query for fetching a single group_types by its ID
    getSingleGroupType: build.query({
      query: (id) => ({
        url: `${GROUP_TYPES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.group_types],
    }),

    // Mutation for updating a single group_types by its ID
    updateGroupType: build.mutation({
      query: ({ id, data }) => ({
        url: `${GROUP_TYPES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.group_types],
    }),

    // Mutation for deleting a group_types by its ID
    deleteGroupType: build.mutation({
      query: (id) => ({
        url: `${GROUP_TYPES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.group_types],
    }),
  }),
});

export const {
  useCreateGroupTypesMutation,
  useGetAllGroupTypesQuery,
  useGetSingleGroupTypeQuery,
  useUpdateGroupTypeMutation,
  useDeleteGroupTypeMutation,
} = groupTypesApi;
