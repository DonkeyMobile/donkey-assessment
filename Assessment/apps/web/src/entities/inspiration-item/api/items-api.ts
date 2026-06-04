import { ApiRoutes, type InspirationItem } from "@donkey/shared";
import { baseApi } from "@/shared/api";

/** Read endpoints for inspiration items, injected into the base API. */
export const inspirationItemApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getItems: build.query<InspirationItem[], void>({
      query: () => ApiRoutes.items,
      providesTags: (result) =>
        result
          ? [
              ...result.map((item) => ({ type: "InspirationItem" as const, id: item.id })),
              { type: "InspirationItem" as const, id: "LIST" },
            ]
          : [{ type: "InspirationItem" as const, id: "LIST" }],
    }),
    getItem: build.query<InspirationItem, string>({
      query: (id) => ApiRoutes.item(id),
      providesTags: (_result, _err, id) => [{ type: "InspirationItem" as const, id }],
    }),
  }),
});

export const { useGetItemsQuery, useGetItemQuery } = inspirationItemApi;
