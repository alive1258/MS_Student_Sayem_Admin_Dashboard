import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const HOME_ABOUT_URL = "/home-about-section";

export const homeAboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  home_about_section
    createHomeAbouts: build.mutation({
      query: (data) => ({
        url: `${HOME_ABOUT_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.home_about_section],
    }),

    // Query for fetching all home_about_section
    getAllHomeAbouts: build.query({
      query: (arg) => ({
        url: `${HOME_ABOUT_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.home_about_section],
    }),

    // Query for fetching a single home_about_section by its ID
    getSingleHomeAbout: build.query({
      query: (id) => ({
        url: `${HOME_ABOUT_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.home_about_section],
    }),

    // Mutation for updating a single home_about_section by its ID
    updateHomeAbout: build.mutation({
      query: ({ id, data }) => ({
        url: `${HOME_ABOUT_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.home_about_section],
    }),

    // Mutation for deleting a home_about_section by its ID
    deleteHomeAbout: build.mutation({
      query: (id) => ({
        url: `${HOME_ABOUT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.home_about_section],
    }),
  }),
});

export const {
  useCreateHomeAboutsMutation,
  useGetAllHomeAboutsQuery,
  useGetSingleHomeAboutQuery,
  useUpdateHomeAboutMutation,
  useDeleteHomeAboutMutation,
} = homeAboutApi;
