import Item from "../../components/notes/item";
import { Button } from "antd";
import { defer, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { get } from "../../utils/api";
import LazyLoading from "../../components/LazyLoading";

const NoteApps = () => {
  const navigate = useNavigate();
  const { event } = useLoaderData();
  return (
    <>
      <div className="flex gap-2 mb-4">
        <h1 className="text-2xl font-semibold">List Folders</h1>
        <div className="mb-4">
          <Button type="primary" onClick={() => navigate("create")}>
            Create Folders
          </Button>
        </div>
      </div>
      <LazyLoading event={event}>
        {(folders) => {
          if (!folders || folders.length === 0) {
            return (
              <div className="flex justify-center items-center h-full">
                Data is empty. No records
              </div>
            );
          }
          return (
            <div className="flex flex-wrap gap-10 py-4 max-h-[calc(100vh-200px)] overflow-auto">
              {folders.map((folder, index) => (
                <Item
                  showClick={(id) => navigate("/folders/" + id)}
                  editClick={(id) => navigate("/folders/" + id + "/update")}
                  deleteClick={(id) => navigate("/folders/" + id + "/delete")}
                  key={folder.id || index}
                  id={folder.id}
                  name={folder.name}
                  description={folder.description}
                />
              ))}
            </div>
          );
        }}
      </LazyLoading>
      <Outlet />
    </>
  );
};

export default NoteApps;

export const loaderFolder = async () => {
  const response = await get("/folders");
  if (!response.ok) {
    throw new Error("Failed to fetch folders");
  }
  return response.json();
};

export function loader() {
  return defer({
    event: loaderFolder(),
  });
}
