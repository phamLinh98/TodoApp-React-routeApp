import { useParams } from "react-router-dom";

const Folder = () => {
  const { folderId } = useParams();
  return (
    <>
      <h1 className="text-2xl font-semibold">Folder Detail</h1>
      <div className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md shadow gap-2 mt-2 hover:shodow-lg transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold">Folder {folderId}</h2>
        <p className="text-sm text-gray-500">
          This is content of Folder {folderId}
        </p>
      </div>
    </>
  );
};
export default Folder;
