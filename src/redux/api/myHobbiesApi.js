import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const MY_HOBBIES_URL = "/my-hobbies";

export const myHobbiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  my_hobbies
    createMyHobbies: build.mutation({
      query: (data) => ({
        url: `${MY_HOBBIES_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.my_hobbies],
    }),

    // Query for fetching all my_hobbies
    getAllMyHobbies: build.query({
      query: (arg) => ({
        url: `${MY_HOBBIES_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.my_hobbies],
    }),

    // Query for fetching a single my_hobbies by its ID
    getSingleMyHobby: build.query({
      query: (id) => ({
        url: `${MY_HOBBIES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.my_hobbies],
    }),

    // Mutation for updating a single my_hobbies by its ID
    updateMyHobby: build.mutation({
      query: ({ id, data }) => ({
        url: `${MY_HOBBIES_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.my_hobbies],
    }),

    // Mutation for deleting a my_hobbies by its ID
    deleteMyHobby: build.mutation({
      query: (id) => ({
        url: `${MY_HOBBIES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.my_hobbies],
    }),
  }),
});

export const {
  useCreateMyHobbiesMutation,
  useGetAllMyHobbiesQuery,
  useGetSingleMyHobbyQuery,
  useUpdateMyHobbyMutation,
  useDeleteMyHobbyMutation,
} = myHobbiesApi;
