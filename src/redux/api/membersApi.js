import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const MEMBERS_URL = "/members";

export const membersApi = baseApi.injectEndpoints({
  // overrideExisting: true,
  endpoints: (build) => ({
    // Mutation for creating a new  members
    createMembers: build.mutation({
      query: (data) => ({
        url: `${MEMBERS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.members],
    }),

    // Query for fetching all members
    getAllMembers: build.query({
      query: (arg) => ({
        url: `${MEMBERS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.members],
    }),

    // Query for fetching a single members by its ID
    getSingleMember: build.query({
      query: (id) => ({
        url: `${MEMBERS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.members],
    }),

    // Mutation for updating a single members by its ID
    updateMember: build.mutation({
      query: ({ id, data }) => ({
        url: `${MEMBERS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.members],
    }),

    // Mutation for deleting a members by its ID
    deleteMember: build.mutation({
      query: (id) => ({
        url: `${MEMBERS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.members],
    }),
  }),
});

export const {
  useCreateMembersMutation,
  useGetAllMembersQuery,
  useGetSingleMemberQuery,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
} = membersApi;
