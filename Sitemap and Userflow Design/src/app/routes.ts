import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Sitemap from "./pages/Sitemap";
import UserFlow from "./pages/UserFlow";
import BrandGuidelines from "./pages/BrandGuidelines";
import DesignSystem from "./pages/DesignSystem";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/sitemap",
    Component: Sitemap,
  },
  {
    path: "/userflow",
    Component: UserFlow,
  },
  {
    path: "/brand-guidelines",
    Component: BrandGuidelines,
  },
  {
    path: "/design-system",
    Component: DesignSystem,
  },
]);