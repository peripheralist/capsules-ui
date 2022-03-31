import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const ReactQueryProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { opacity: 0 } }}
    />
  </QueryClientProvider>
);

export default ReactQueryProvider;
