import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const HOME_HERO_URL = "/home-hero-section";

export const homeHeroApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  home_hero_section
    createHomeHeros: build.mutation({
      query: (data) => ({
        url: `${HOME_HERO_URL}`,
        method: "POST",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.home_hero_section],
    }),

    // Query for fetching all home_hero_section
    getAllHomeHeros: build.query({
      query: (arg) => ({
        url: `${HOME_HERO_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.home_hero_section],
    }),

    // Query for fetching a single home_hero_section by its ID
    getSingleHomeHero: build.query({
      query: (id) => ({
        url: `${HOME_HERO_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.home_hero_section],
    }),

    // Mutation for updating a single home_hero_section by its ID
    updateHomeHero: build.mutation({
      query: ({ id, data }) => ({
        url: `${HOME_HERO_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.home_hero_section],
    }),

    // Mutation for deleting a home_hero_section by its ID
    deleteHomeHero: build.mutation({
      query: (id) => ({
        url: `${HOME_HERO_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.home_hero_section],
    }),
  }),
});

export const {
  useCreateHomeHerosMutation,
  useGetAllHomeHerosQuery,
  useGetSingleHomeHeroQuery,
  useUpdateHomeHeroMutation,
  useDeleteHomeHeroMutation,
} = homeHeroApi;
