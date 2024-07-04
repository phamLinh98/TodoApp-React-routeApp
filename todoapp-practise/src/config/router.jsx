/* eslint-disable react-refresh/only-export-components */
import {
  EditOutlined,
  HomeOutlined,
  LayoutOutlined,
  ProfileOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { createBrowserRouter, redirectDocument } from "react-router-dom";
import RootLayout from "../components/RootLayout";

const redirect = (condition, redirect) => {
  return async () => {
    if (window.location.pathname === condition) {
      return redirectDocument(redirect);
    }
    return null;
  };
};

export const rootConfig = [
  {
    element: <RootLayout />,
    children: [
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
      {
        path: "note",
        menu: {
          key: "note",
          icon: <EditOutlined />,
          label: "Note",
        },
        element: <h1>This is Note page</h1>,
        children: [
          {
            path: ":folderId",
            element: <h1>This is Folder Detail page</h1>,
            children: [
              {
                path: "create",
                element: <h1>This is Note New page</h1>,
              },
              {
                path: "update",
                element: <h1>This is Note Edit page</h1>,
              },
              {
                path: "delete",
                element: <h1>This is Note Delete page</h1>,
              },
              {
                path: ":noteId",
                element: <h1>This is Note Detail page</h1>,
                children: [
                  {
                    path: "create",
                    element: <h1>This is Note New page</h1>,
                  },
                  {
                    path: "update",
                    element: <h1>This is Note Edit page</h1>,
                  },
                  {
                    path: "delete",
                    element: <h1>This is Note Delete page</h1>,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "settings",
        menu: {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
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
    ],
  },
];

const router = createBrowserRouter(rootConfig);

export default router;
