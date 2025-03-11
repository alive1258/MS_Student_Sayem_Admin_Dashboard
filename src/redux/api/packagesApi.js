import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const PACKAGES_URL = "/packages";

export const packagesApi = baseApi.injectEndpoints({
  // overrideExisting: true,
  endpoints: (build) => ({
    // Mutation for creating a new  packages
    createPackages: build.mutation({
      query: (data) => ({
        url: `${PACKAGES_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.packages],
    }),

    // Query for fetching all packages
    getAllPackages: build.query({
      query: (arg) => ({
        url: `${PACKAGES_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.packages],
    }),

    // Query for fetching a single packages by its ID
    getSinglePackage: build.query({
      query: (id) => ({
        url: `${PACKAGES_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.packages],
    }),

    // Mutation for updating a single packages by its ID
    updatePackage: build.mutation({
      query: ({ id, data }) => ({
        url: `${PACKAGES_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.packages],
    }),

    // Mutation for deleting a packages by its ID
    deletePackage: build.mutation({
      query: (id) => ({
        url: `${PACKAGES_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.packages],
    }),
  }),
});

export const {
  useCreatePackagesMutation,
  useGetAllPackagesQuery,
  useGetSinglePackageQuery,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packagesApi;
