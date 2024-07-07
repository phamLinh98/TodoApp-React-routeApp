import { HomeOutlined } from "@ant-design/icons";
const homeRoute = [
  {
    index: true,
    menu: {
      key: "home",
      icon: <HomeOutlined />,
      label: "Home",
    },
    element: <h1>This is Home page</h1>,
  },
  {
    path: "home",
    element: <h1>This is Home page</h1>,
  },
];
export default homeRoute;
