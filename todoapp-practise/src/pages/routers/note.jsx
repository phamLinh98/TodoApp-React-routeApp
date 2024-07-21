import { EditOutlined } from "@ant-design/icons";
import Notes, { loader as notesLoader } from "../notes";
import Folder, { loader as folderLoader } from "../notes/folder";
import CreateFolder, {
  action as createFolderAction,
} from "../notes/folder/create";

import UpdateFolder, {
  action as updateFolderAction,
} from "../notes/folder/update";
import ErrorElement from "../../components/ErrorElement";
import DeleteFolder, {
  action as deleteFolderAction,
} from "../notes/folder/delete";
import Note from "../notes/folder/note";

const noteRoute = [
  {
    path: "notes",
    errorElement: <ErrorElement />,
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
        element: <Notes />,
        loader: notesLoader,
        children: [
          {
            path: "delete",
            element: <DeleteFolder />,
            loader: folderLoader,
            action: deleteFolderAction,
          },
        ],
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
            loader: folderLoader,
            action: updateFolderAction,
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
