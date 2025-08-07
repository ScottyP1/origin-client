import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./RootLayout";

import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoardPage from "./pages/DashboardPage";
import GitHubCallback from "./pages/GitHubCallback";
import RepoPage from "./pages/RepoPage";

import { IndexLoader } from "./loaders/IndexLoader";
import { AuthLoader } from "./loaders/AuthLoader";

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { index: true, element: <IndexPage />, loader: IndexLoader },
      {
        path: "dashboard",
        element: <DashBoardPage />,
        loader: AuthLoader,
      },
      {
        path: "repos",
        element: <RepoPage />,
        loader: AuthLoader,
      },
      { path: "login", element: <LoginPage />, loader: IndexLoader },
      { path: "register", element: <RegisterPage />, loader: IndexLoader },
      { path: "github-callback", element: <GitHubCallback /> },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
