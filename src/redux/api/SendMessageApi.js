import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SEND_MESSAGE_URL = "/send-messages";

export const sendMessageApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  send_messages
    createSendMeaages: build.mutation({
      query: (data) => ({
        url: `${SEND_MESSAGE_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.send_messages],
    }),

    // Query for fetching all send_messages
    getAllSendMeaages: build.query({
      query: (arg) => ({
        url: `${SEND_MESSAGE_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.send_messages],
    }),

    // Query for fetching a single send_messages by its ID
    getSingleSendMeaage: build.query({
      query: (id) => ({
        url: `${SEND_MESSAGE_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.send_messages],
    }),

    // Mutation for updating a single send_messages by its ID
    updateSendMeaage: build.mutation({
      query: ({ id, data }) => ({
        url: `${SEND_MESSAGE_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.send_messages],
    }),

    // Mutation for deleting a send_messages by its ID
    deleteSendMeaage: build.mutation({
      query: (id) => ({
        url: `${SEND_MESSAGE_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.send_messages],
    }),
  }),
});

export const {
  useCreateSendMeaagesMutation,
  useGetAllSendMeaagesQuery,
  useGetSingleSendMeaageQuery,
  useUpdateSendMeaageMutation,
  useDeleteSendMeaageMutation,
} = sendMessageApi;
