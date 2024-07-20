import { createBrowserRouter } from "react-router-dom";
import homeRoute from "./home";
import noteRoute from "./note";
import settingRoute from "./setting";
import RootLayout from "../../components/RootLayout";
import NotFound from "../../components/NotFound";

export const rootConfig = [
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [...homeRoute, ...noteRoute, ...settingRoute],
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
