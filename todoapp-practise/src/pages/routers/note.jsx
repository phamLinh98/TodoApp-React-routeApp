import { EditOutlined } from "@ant-design/icons";
import Notes, { loader as notesLoader } from "../notes";
import Folder, { loader as folderLoader } from "../notes/folder";
import Note from "../notes";
import CreateFolder, {
  action as createFolderAction,
} from "../notes/folder/create";

import UpdateFolder from "../notes/folder/update";
const noteRoute = [
  {
    path: "notes",
    menu: {
      key: "notes",
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
            loader: folderLoader,
          },
          {
            path: "create",
            element: <CreateFolder />,
            action: createFolderAction,
          },
          {
            path: "update",
            element: <UpdateFolder />,
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
