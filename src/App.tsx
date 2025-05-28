import { Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./pages/error-fallback";

function App() {
  const customRoutes = createHashRouter(routes);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Suspense>
        <RouterProvider router={customRoutes} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
