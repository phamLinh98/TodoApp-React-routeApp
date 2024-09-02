import { EditOutlined } from "@ant-design/icons";
import ErrorElement from "../components/ErrorElement";
import NoteApps, { noteAppLoader } from "../pages/notes-app";
import Folder, { folderLoader } from "../pages/notes-app/folder";
import CreateFolder, {createFolderAction } from "../pages/notes-app/folder/create";
import DeleteFolder, {
  deleteFolderAction,
} from "../pages/notes-app/folder/delete";
import Note from "../pages/notes-app/folder/note";
import UpdateFolder, {
  updateFolderAction,
} from "../pages/notes-app/folder/update";
import CreateNote, {
  createNoteAction,
} from "../pages/notes-app/folder/note/create";

const noteAppRoute = [
  {
    path: "folders",
    errorElement: <ErrorElement />,
    menu: {
      key: "folders",
      icon: <EditOutlined />,
      label: "Note App",
    },
    children: [
      {
        index: true,
        element: <NoteApps />,
        loader: noteAppLoader,
      },
      {
        path: ":folderId",
        element: <NoteApps />,
        loader: noteAppLoader,
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
        path: "create",
        element: <CreateFolder />,
        action: createFolderAction,
      },
      {
        path: ":folderId",
        element: <Folder />,
        loader: folderLoader,
        children: [
          {
            path: "create",
            element: <CreateNote />,
            action: createNoteAction,
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
            path: "update",
            element: <UpdateFolder />,
            loader: folderLoader,
            action: updateFolderAction,
          },
          {
            path: ":noteId",
            element: <Folder />,
            loader: folderLoader,
            children: [
              {
                index: true,
                element: <Note />,
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

export default noteAppRoute;
