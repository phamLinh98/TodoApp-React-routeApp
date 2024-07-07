/* eslint-disable react-refresh/only-export-components */
import {
  LayoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { redirectDocument } from "react-router-dom";
const redirect = (condition, redirect) => {
  return async () => {
    if (window.location.pathname === condition) {
      return redirectDocument(redirect);
    }
    return null;
  };
};

export const settingRoute = [
  {
    path: "settings",
    menu: {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    // TODO: what is loader ? and redirect ?
    loader: redirect("/settings", "/settings/profile"),
    children: [
      {
        path: "profile",
        menu: {
          key: "profile",
          icon: <ProfileOutlined />,
          label: "Profile",
        },
        element: <h1>This is Profile page</h1>,
      },
      {
        path: "layout",
        menu: {
          key: "layout",
          icon: <LayoutOutlined />,
          label: "Layout",
        },
        element: <h1>This is Layout page</h1>,
      },
    ],
  },
];

export default settingRoute;
