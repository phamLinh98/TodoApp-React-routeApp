import { Button, Input } from "antd";
import {
  defer,
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { get, update } from "../../../utils/api";
import { useState } from "react";

const UpdateFolder = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmiting = navigation.state === "submitting";
  const { folder } = useLoaderData();
  const [folderData, setFolderData] = useState(folder);

  // Xử lý khi người dùng submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", folderData);
  };

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold mb-4">Update Folder</h1>
      <Form method="post" className="max-w-[600px]" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="folderName" className="block mb-2">
            Folder Name
          </label>
          <Input
            id="folderName"
            name="folderName"
            required
            className="w-full"
            disabled={isSubmiting}
            value={folderData.name}
            onChange={(e) =>
              setFolderData({ ...folderData, name: e.target.value })
            }
          ></Input>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <Input.TextArea
            id="description"
            name="description"
            required
            className="w-full"
            disabled={isSubmiting}
            value={folderData.description}
            onChange={(e) =>
              setFolderData({ ...folderData, description: e.target.value })
            }
          />
        </div>
        <div className="text-right">
          <Button type="primary" htmlType="submit">
            {isSubmiting ? "Submiting..." : "Submit"}
          </Button>
        </div>
      </Form>
      {actionData && actionData.error && (
        <p className="text-red-500 mt-4">{actionData.error}</p>
      )}
    </div>
  );
};
export default UpdateFolder;

export const loadFolder = async (id) => {
  const response = await get(`/folders/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

// Loader để tải chi tiết folder
export const loaderUpdate = async ({ params }) => {
  if (!params.id) {
    throw new Error("Folder ID is required");
  }

  const folderId = params.id;
  const folder = await loadFolder(folderId);
  return defer({ folder });
};

export async function actionUpdate({ request, id }) {
  const formData = await request.formData();
  const folderName = formData.get("folderName");
  const description = formData.get("description");
  try {
    await update(`/folders/${id}`, {
      name: folderName,
      description,
    });
    return redirect("/notes");
  } catch (error) {
    return { error: "Error creating folder" };
  }
}
