import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PROFESSOR_URL = "/professors";

export const professorApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  professors
    createProfessors: build.mutation({
      query: (data) => ({
        url: `${PROFESSOR_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.professors],
    }),

    // Query for fetching all professors
    getAllProfessors: build.query({
      query: (arg) => ({
        url: `${PROFESSOR_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.professors],
    }),

    // Query for fetching a single professors by its ID
    getSingleProfessor: build.query({
      query: (id) => ({
        url: `${PROFESSOR_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.professors],
    }),

    // Mutation for updating a single professors by its ID
    updateProfessor: build.mutation({
      query: ({ id, data }) => ({
        url: `${PROFESSOR_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.professors],
    }),

    // Mutation for deleting a professors by its ID
    deleteProfessor: build.mutation({
      query: (id) => ({
        url: `${PROFESSOR_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.professors],
    }),
  }),
});

export const {
  useCreateProfessorsMutation,
  useGetAllProfessorsQuery,
  useGetSingleProfessorQuery,
  useUpdateProfessorMutation,
  useDeleteProfessorMutation,
} = professorApi;
