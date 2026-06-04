"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "@/app/store";

/**
 * Client-side Redux provider. The store is created once per client instance
 * (via a lazy useState initializer) so it is never shared across requests
 * during SSR and never recreated on re-render.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const [store] = useState(makeStore);
  return <Provider store={store}>{children}</Provider>;
}
