import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

const ReactQueryProvider: React.FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools
      initialIsOpen={false}
      toggleButtonProps={{ style: { display: "none" } }}
    />
  </QueryClientProvider>
);

export default ReactQueryProvider;
