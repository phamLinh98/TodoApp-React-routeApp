import LazyLoading from "../../../components/LazyLoading";
import { del } from "../../../utils/api";
import {
  Form,
  redirect,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import AntdModal from "../../../components/Models";

//TODO: solve css for modal
//TODO: content for this folder

const DeleteFolder = () => {
  const submit = useSubmit();
  const { folder } = useLoaderData();
  const navigate = useNavigate();
  return (
    <>
      <AntdModal
        open={true}
        closable={true}
        footer={null}
        onCancel={() => navigate(-1)}
      >
        <h1 className="text-2xl font-semibold">Xoá folder này nhé ?</h1>
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
              <Form
                method="post"
                onSubmit={(event) => {
                  event.preventDefault();
                  submit(event.target, { method: "delete" });
                }}
                className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md shadow gay-2 mt-2 hover:shadow-lg transition duration-300 ease-in-out"
              >
                <h2 className="text-lg font-semibold">Folder {folder.name}</h2>
                <div className="text-sm text-gray-500 max-h-[30vh] overflow-auto">
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
                      submit(null, { method: "get", action: "/folders" })
                    }
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            );
          }}
        </LazyLoading>
      </AntdModal>
    </>
  );
};

export default DeleteFolder;

export async function deleteFolderAction({ request }) {
  const formData = await request.formData();
  const folderId = formData.get("folderId");
  try {
    await del(`/folders/` + folderId);
    return redirect("/folders");
  } catch (error) {
    return { error: "Error deleting folder" };
  }
}
