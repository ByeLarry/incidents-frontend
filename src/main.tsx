import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import themeStore from "./stores/theme.store.tsx";
import { Spinner } from "./components/ui/spinner/spinner.tsx";
import { XXXLARGE_SIZE_MARKER } from "./utils";

const queryClient = new QueryClient();
const { lightMode } = themeStore;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <Spinner
              visible
              lightMode={lightMode}
              fixed
              size={XXXLARGE_SIZE_MARKER}
            />
          }
        >
          <App />
        </Suspense>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
