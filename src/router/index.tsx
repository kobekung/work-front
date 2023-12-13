import { createBrowserRouter } from "react-router-dom";
import MainTemplate from "../components/MainTemplate";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ClearcachePage from "../pages/ClearcachePage";
import ManageUserPage from "../pages/ManageUserPage";
import ManageCountryPage from "../pages/ManageCountry";
import ProjectPage from "../pages/ProjectPage";
import ProductPage from "../pages/ProductPage";
import ManageCategoryPage from "../pages/ManageCategoryPage";
import DashboardPage from "../pages/DashboardPage";
import ManageGroupCountryPage from "../pages/ManageGroupCountry";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },

  {
    path: "/",
    element: <MainTemplate />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/project",
        element: <ProjectPage />,
      },
      {
        path: "/product/:id",
        element: <ProductPage />,
      },
      {
        path: "/manage-group-country",
        element: <ManageGroupCountryPage />,
      },
      {
        path: "/manage-category",
        element: <ManageCategoryPage />,
      },
      {
        path: "/manage-user",
        element: <ManageUserPage />,
      },
      {
        path: "/manage-country",
        element: <ManageCountryPage />,
      },
      {
        path: "/clear_user_cache",
        element: <ClearcachePage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
