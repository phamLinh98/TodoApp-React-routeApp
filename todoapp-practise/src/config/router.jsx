import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import HomeOutlined from "@ant-design/icons";

export const rootConfig = [
  {
    path: "/",
    element: <RootLayout />,
    menu: {
      key: "1",
      icons: <HomeOutlined />,
      label: "Home",
    },
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
    ],
  },
];
const router = createBrowserRouter(rootConfig);

export default router;
