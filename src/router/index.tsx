import { createBrowserRouter } from "react-router-dom";
import MainTemplate from "../components/MainTemplate";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ClearcachePage from "../pages/ClearcachePage";
import ManageUserPage from "../pages/ManageUserPage";
import ManageCountryPage from "../pages/ManageCountry";
import ManageCountryGroupPage from "../pages/ManageCountryGroupPage";

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
        path: "/manage-group-country",
        element: <ManageCountryGroupPage />,
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
