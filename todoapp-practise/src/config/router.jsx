import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import { HomeOutlined } from "@ant-design/icons";

export const rootConfig = [
  {
    path: "/",
    element: <RootLayout />,
    menu: {
      key: "home",
      icons: <HomeOutlined />,
      label: "Home",
    },
  },
];
const router = createBrowserRouter(rootConfig);

export default router;
