import { createBrowserRouter } from "react-router-dom";
import homeRoute from "./home";
import noteAppRoute from "./note-app";
import settingRoute from "./setting";
import RootLayout from "../../components/RootLayout";
import NotFound from "../../components/NotFound";

//TODO: fix route here
export const rootConfig = [
  {
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [...homeRoute, ...noteAppRoute, ...settingRoute],
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
