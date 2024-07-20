import { toast } from "react-toastify";
import LazyLoading from "../../../components/LazyLoading";
import { del, get } from "../../../utils/api";
import { defer, Form, redirect, useSubmit } from "react-router-dom";

const DeleteFolder = () => {
  const submit = useSubmit();
  const handleDelete = (event) => {
    event.preventDefault();

    toast.warn(
      <div>
        <p>Xoá không em ê ?</p>
        <div className="mt-2">
          <button
            onClick={() => {
              toast.dismiss();
              submit(event.target, { method: "delete" });
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
          >
            Yes
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md"
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-center",
      }
    );
  };
  return (
    <>
      <h1 className="text-2xl font-semibold">
        Do you want to delete this folder ?
      </h1>
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
            <Form
              method="post"
              onSubmit={(event) => handleDelete(event)}
              className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md shadow gay-2 mt-2 hover:shadow-lg transition duration-300 ease-in-out"
            >
              <h2 className="text-lg font-semibold">Folder{folder.name}</h2>
              <div className="text-sm text-gray-500">
                This is content of Folder: {folder.description}
              </div>
              <input type="hidden" name="folderName" value={folder.name} />
              <input
                type="hidden"
                name="description"
                value={folder.decription}
              />
              <input type="hidden" name="folderId" value={folder.id} />
              <div className="text-right">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow"
                  type="submit"
                >
                  Delete
                </button>
                <button
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md shadow ml-2"
                  type="button"
                  onClick={() =>
                    submit(null, { method: "get", action: "/notes" })
                  }
                >
                  Cancel
                </button>
              </div>
            </Form>
          );
        }}
      </LazyLoading>
    </>
  );
};

export default DeleteFolder;

export const loadeEvent = async (folderId) => {
  const response = await get(`/folders/${folderId}`);
  if (!response.ok) {
    throw new Error("Can't load folder");
  }
  return response.json();
};

export const loader = ({ params }) => {
  return defer({
    event: loadeEvent(params.folderId),
  });
};

export async function action({ resquest }) {
  const formData = await resquest.formData();
  const folderId = formData.get("folderId");
  try {
    await del("/folders/" + folderId);
    return redirect("/notes");
  } catch (error) {
    return { error: "Failed to delete folder.Please try again" };
  }
}
