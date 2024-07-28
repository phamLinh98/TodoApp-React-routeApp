import { Button } from "antd";
import LazyLoading from "../../../components/LazyLoading";
import { get } from "../../../utils/api";
import { defer, Outlet, useLoaderData, useNavigate } from "react-router-dom";

const Folder = () => {
  const navigate = useNavigate();
  const { event } = useLoaderData();
  return (
    <>
      <h1 className="text-2xl font-semibold">Folder Detail</h1>
      <LazyLoading event={event}>
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
                      onClick={() => navigate("folders/create")}
                    >
                      Create Note
                    </Button>
                  </div>
                </div>
              </div>
            </>
          );
        }}
      </LazyLoading>
      <Outlet />
    </>
  );
};
export default Folder;

export const loadEvent = async (folderId) => {
  const response = await get(`/folders/${folderId}`);
  if (!response.ok) {
    throw new Error("Can't load folder");
  }
  return response.json();
};

export const loadEventForNotes = async (noteId) => {
  const response = await get(`/notes/${noteId}`);
  if (!response.ok) {
    throw new Error("Can't load noteId");
  }
  return response.json();
};

export const loader = ({ params }) => {
  return defer({
    event: loadEvent(params.folderId),
    events: loadEventForNotes(params.noteId),
  });
};
