import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * Empty base API. Feature/entity slices extend it via `injectEndpoints`, keeping
 * each slice's endpoints colocated with that slice (FSD-friendly).
 *
 * baseUrl is relative ('') so requests target the web origin and are proxied to
 * the API by Next rewrites — cookies stay first-party.
 */
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  tagTypes: ["InspirationItem"],
  endpoints: () => ({}),
});
