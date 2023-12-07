import { createBrowserRouter } from "react-router-dom";
import MainTemplate from "../components/MainTemplate";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import ClearcachePage from "../pages/ClearcachePage";
import ManageUserPage from "../pages/ManageUserPage";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />
    },

    {
        path: '/',
        element: <MainTemplate />,
        children: [
            {
                path: "/manage-user",
                element: <ManageUserPage />
            },
            {
                path: "/clear_user_cache",
                element: <ClearcachePage />
            }
        ]
    },
    {
        path: '*',
        element: <NotFoundPage />
    },
])