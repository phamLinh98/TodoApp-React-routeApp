import { Button } from "antd";
import LazyLoading from "../../../components/LazyLoading";
import { get } from "../../../utils/api";
import { defer, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import Item from "antd/es/list/Item";

const Folder = () => {
  const navigate = useNavigate();
  const { folderId } = useLoaderData();
  const { folder, notes } = useLoaderData();
  return (
    <>
      <h1 className="text-2xl font-semibold">Folder Detail</h1>
      <LazyLoading event={folder}>
        {(folder) => {
          if (!folder) {
            return (
              <div className="flex justify-center items-center h-full">
                Dont have any folder
              </div>
            );
          }
          return (
            <>
              <div className="flex flex-col space-y-2 p-4 border-gray-200 rounded-md shadow gap-2 mt-2 hover:show-lg transition duration-300 ease-in-out">
                <h2 className="text-lg font-semibold">Folder:{folder.name}</h2>
                <div className="text-sm text-gray-500">
                  Description:{" "}
                  {
                    <div
                      dangerouslySetInnerHTML={{ __html: folder.description }}
                    ></div>
                  }
                </div>
                <div className="flex gap-2 mb-4">
                  <h1 className="text-2xl font-semibold">List Notes</h1>
                  <div className="mb-4">
                    <Button
                      type="primary"
                      onClick={() =>
                        navigate("/folders/" + folder.id + "/create")
                      }
                    >
                      Create Note
                    </Button>
                  </div>
                </div>
                <LazyLoading event={notes}>
                  {(notes) => {
                    if (!notes || notes.length === 0) {
                      return (
                        <div className="flex justify-center items-center h-full">
                          Dont have any folder
                        </div>
                      );
                    }
                    return (
                      <div className="flex flex-wrap gap-10 py-4 max-h-[calc(100vh-200px)] overflow-auto">
                        {notes.map((note, index) => {
                          <Item
                            showClick={(id) =>
                              navigate("/folders/" + folderId + "/" + id + "")
                            }
                            editClick={(id) =>
                              navigate(
                                "/folders/" + folderId + "/" + id + "/update"
                              )
                            }
                            deleteClick={(id) =>
                              navigate(
                                "/folders/" + folderId + "/" + id + "/delete"
                              )
                            }
                            key={note.id || index}
                            id={note.id}
                            name={note.title}
                            description={note.description}
                          />;
                        })}
                      </div>
                    );
                  }}
                </LazyLoading>
              </div>
            </>
          );
        }}
      </LazyLoading>
      <Outlet />
      <div className="text-right">
        <Button type="default" onClick={() => navigate("/folders")}>
          Back
        </Button>
      </div>
    </>
  );
};
export default Folder;

export const loadFolderInfo = async (folderId) => {
  const response = await get(`/folders/${folderId}`);
  if (!response.ok) {
    throw new Error("Can't load folder");
  }
  return response.json();
};

export const loadListNotes = async (noteId) => {
  const response = await get(`/notes?folder=${noteId}`);
  if (!response.ok) {
    throw new Error("Can't load noteId");
  }
  return response.json();
};

export const folderLoader = ({ params }) => {
  return defer({
    folder: loadFolderInfo(params.folderId),
    notes: loadListNotes(params.noteId),
  });
};
