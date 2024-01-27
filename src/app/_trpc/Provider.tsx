"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "./client";

// Q. 왜 근데 useState로 보관? 그냥 Component 위에 놓아도 되지 않느냐?
// 잘 되는 거 보니 괜찮은 듯?
const queryClient = new QueryClient({});
const trpcClient = trpc.createClient({
    links: [
      httpBatchLink({
        url: "http://localhost:3000/api/trpc",
      }),
    ],
  });
  
export default function Provider({ children }: { children: React.ReactNode }) {
  console.log('client Provider')

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
