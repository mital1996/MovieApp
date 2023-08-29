import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root";
import HomePage from "./pages/HomePage";
import FavouritePage from "./pages/FavouritePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/favourite", element: <FavouritePage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
