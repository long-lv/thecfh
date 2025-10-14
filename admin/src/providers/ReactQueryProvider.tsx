"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
    const [queryClient] = useState(
        () => new QueryClient({
            defaultOptions: {
                queries: {
                    // no retry when error
                    retry: 1,
                    // no refetch when window focus
                    refetchOnWindowFocus: false,
                    // stale time 5 minutes after data is fetched
                    staleTime: 5 * 60 * 1000, // 5 minutes
                },
                mutations: {
                    retry: 0
                }
            }
        })
    )
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
