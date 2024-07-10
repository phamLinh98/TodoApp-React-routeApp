import { EditOutlined } from "@ant-design/icons";
import Notes from "../notes";
import Folder from "../notes/folder";
import Note from "../notes";

const noteRoute = [
  {
    path: "note",
    menu: {
      key: "note",
      icon: <EditOutlined />,
      label: "List Note",
    },
    children: [
      {
        index: true,
        element: <Notes />,
      },
      {
        path: ":folderId",
        children: [
          {
            index: true,
            element: <Folder />,
          },
          {
            path: "create",
            element: <h1>This is Folder New Page</h1>,
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
            children: [
              {
                index: true,
                element: <Note />,
              },
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
];
export default noteRoute;
