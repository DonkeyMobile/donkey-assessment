import { ApiRoutes, type ContentInput, type InspirationItem } from "@donkey/shared";
import { baseApi } from "@/shared/api";

const LIST = { type: "InspirationItem" as const, id: "LIST" };

/** Admin endpoints (full list + mutations), injected into the base API. */
export const adminItemsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAdminItems: build.query<InspirationItem[], void>({
      query: () => ApiRoutes.adminItems,
      providesTags: (result) =>
        result
          ? [...result.map((i) => ({ type: "InspirationItem" as const, id: i.id })), LIST]
          : [LIST],
    }),
    createItem: build.mutation<InspirationItem, ContentInput>({
      query: (body) => ({ url: ApiRoutes.adminItems, method: "POST", body }),
      invalidatesTags: [LIST],
    }),
    updateItem: build.mutation<InspirationItem, { id: string; values: ContentInput }>({
      query: ({ id, values }) => ({ url: ApiRoutes.adminItem(id), method: "PUT", body: values }),
      invalidatesTags: (_r, _e, { id }) => [{ type: "InspirationItem", id }, LIST],
    }),
    deleteItem: build.mutation<void, string>({
      query: (id) => ({ url: ApiRoutes.adminItem(id), method: "DELETE" }),
      invalidatesTags: (_r, _e, id) => [{ type: "InspirationItem", id }, LIST],
    }),
    resetItems: build.mutation<InspirationItem[], void>({
      query: () => ({ url: ApiRoutes.adminReset, method: "POST" }),
      invalidatesTags: [LIST],
    }),
  }),
});

export const {
  useGetAdminItemsQuery,
  useCreateItemMutation,
  useUpdateItemMutation,
  useDeleteItemMutation,
  useResetItemsMutation,
} = adminItemsApi;
