import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SKILLS_URL = "/skills";

export const skillsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  skills
    createSkills: build.mutation({
      query: (data) => ({
        url: `${SKILLS_URL}`,
        method: "POST",

        data,
      }),
      invalidatesTags: [tagTypes.skills],
    }),

    // Query for fetching all skills
    getAllSkills: build.query({
      query: (arg) => ({
        url: `${SKILLS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.skills],
    }),

    // Query for fetching a single skills by its ID
    getSingleSkills: build.query({
      query: (id) => ({
        url: `${SKILLS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.skills],
    }),

    // Mutation for updating a single skills by its ID
    updateSkills: build.mutation({
      query: ({ id, data }) => ({
        url: `${SKILLS_URL}/${id}`,
        method: "PATCH",

        data,
      }),
      invalidatesTags: [tagTypes.skills],
    }),

    // Mutation for deleting a skills by its ID
    deleteSkills: build.mutation({
      query: (id) => ({
        url: `${SKILLS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.skills],
    }),
  }),
});

export const {
  useCreateSkillsMutation,
  useGetAllSkillsQuery,
  useGetSingleSkillsQuery,
  useUpdateSkillsMutation,
  useDeleteSkillsMutation,
} = skillsApi;
