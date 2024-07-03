import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/RootLayout";
import {
  HomeOutlined,
  EditOutlined,
  SettingOutlined,
  ProfileOutlined,
  LayoutOutlined,
} from "@ant-design/icons";

export const Setting = () => {
  //TODO: solve st here render setting profile by useEffect
};

export const rootConfig = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <h1>404 Not Found</h1>,
    children: [
      {
        index: true,
        //TODO: solve somthing here for router home
        path: "/home",
        menu: {
          key: "home",
          icon: <HomeOutlined />,
          label: "Home",
        },
        element: <h1>This is Home Page</h1>,
      },
      {
        path: "note",
        menu: {
          key: "note",
          icon: <EditOutlined />,
          label: "Note",
        },
        element: <h1>This is Note Page</h1>,
        children: [
          {
            key: ":folderId",
            element: <h1>This is Note Detail Page</h1>,
            children: [
              {
                index: true,
                element: <h1>This is Note View Page</h1>,
              },
              {
                key: "create",
                element: <h1>This is Note Create Page</h1>,
              },
              {
                key: "replace",
                element: <h1>This is Note Replace Page</h1>,
              },
              {
                key: "update",
                element: <h1>This is Note Update Page</h1>,
              },
              {
                key: "delete",
                element: <h1>This is Note Delete Page</h1>,
              },
              {
                key: ":nodeId",
                children: [
                  {
                    key: "",
                    element: <h1>This is Note Detail Page</h1>,
                  },
                  {
                    key: "replace",
                    element: <h1>This is Note Replace Page</h1>,
                  },
                  {
                    key: "create",
                    element: <h1>This is Note Create Page</h1>,
                  },
                  {
                    key: "edit",
                    element: <h1>This is Note Edit Page</h1>,
                  },
                  {
                    key: "delete",
                    element: <h1>This is Note Delete Page</h1>,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "/settings",
        menu: {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        element: <h1>This is Setting Page</h1>,
        //TODO: fix st here for layout setting page
        //TODO: loader etc...
        children: [
          {
            path: "profile",
            menu: {
              key: "profile",
              icon: <ProfileOutlined />,
              label: "Profile",
            },
            element: <h1>This is Profile Page</h1>,
          },
          {
            path: "layout",
            menu: {
              key: "layout",
              icon: <LayoutOutlined />,
              label: "Layout",
            },
            element: <h1>This is Layout Page</h1>,
          },
        ],
      },
    ],
  },
];
const router = createBrowserRouter(rootConfig);

export default router;
