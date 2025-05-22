import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes";

function App() {
  const customRoutes = createBrowserRouter(routes);

  return (
    <Suspense>
      <RouterProvider router={customRoutes} />
    </Suspense>
  );
}

export default App;
