import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
import MoreWorks from "./pages/MoreWorks";
import MoreWorks2 from "./pages/MoreWorks2";
import MoreWorks3 from "./pages/MoreWorks3";
import Colors from "./pages/Colors";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/gallery",
    Component: Gallery,
  },
  {
    path: "/colors",
    Component: Colors,
  },
  {
    path: "/more-works",
    Component: MoreWorks,
  },
  {
    path: "/more-works-2",
    Component: MoreWorks2,
  },
  {
    path: "/more-works-3",
    Component: MoreWorks3,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
