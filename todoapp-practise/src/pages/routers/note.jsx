import { EditOutlined } from "@ant-design/icons";
import Notes, { loader as notesLoader } from "../notes";
import Folder from "../notes/folder";
import Note from "../notes";

//TODO: adding loader for note
//TODO: lazy loading by defer
//TODO: solve data for node by load data
const noteRoute = [
  {
    path: "note",
    menu: {
      key: "note",
      icon: <EditOutlined />,
      label: "Notes",
    },
    children: [
      {
        index: true,
        element: <Notes />,
        loader: notesLoader,
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
