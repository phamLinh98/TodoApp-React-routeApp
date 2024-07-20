import LazyLoading from "../../../components/LazyLoading";
import { get } from "../../../utils/api";
import { defer } from "react-router-dom";

const Folder = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">Folder Detail</h1>
      <LazyLoading>
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
                <h2 className="text-lg font-semibold">Folder{folder.name}</h2>
                <div className="text-sm text-gray-500">
                  This is content of Folder:{folder.description}
                </div>
                <div></div>
              </div>
            </>
          );
        }}
      </LazyLoading>
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

export const loader = ({ params }) => {
  return defer({
    event: loadEvent(params.folderId),
  });
};
