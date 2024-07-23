import { Button, Input } from "antd";
import {
  useActionData,
  useNavigation,
  Form,
  useNavigate,
} from "react-router-dom";
import { put } from "../../../utils/api";
import { redirect } from "react-router-dom";
import LazyLoading from "../../../components/LazyLoading";
import { useState } from "react";
import ReactQuill from "react-quill";

//TODO: adding reactQuill

const UpdateFolder = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmiting = navigation.state === "submitting";
  const [description, setDescription] = useState("");
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold mb-4">Edit Folder</h1>
      <LazyLoading>
        {(folder) => {
          if (!folder) {
            return (
              <div className="flex justify-center h-full">
                Dont have any folder
              </div>
            );
          }
          return (
            <Form method="post" className="max-w-[600px]">
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
                  defaultValue={folder.name}
                ></Input>
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">
                  Description
                </label>
                <Input
                  hidden
                  id="description"
                  name="description"
                  value={description}
                ></Input>
                <ReactQuill
                  theme="snow"
                  onChange={setDescription}
                  defaultValue={folder.description}
                />
              </div>
              {actionData && actionData.error && (
                <p className="text-red-500 mt-4">{actionData.error}</p>
              )}
              <div>
                <input
                  type="hidden"
                  name="originalFolder"
                  value={JSON.stringify(folder)}
                />
              </div>
              <div className="flex justify-end">
                <div className="flex gap-2">
                  <Button onClick={() => navigate("/notes")} type="default">
                    Cancel
                  </Button>
                  <Button type="primary" htmlType="submit">
                    {isSubmiting ? "Submiting..." : "Submit"}
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </LazyLoading>
    </div>
  );
};

export default UpdateFolder;

export async function action({ request, params }) {
  const formData = await request.formData();
  const originalFolder = JSON.parse(formData.get("originalFolder"));
  // >> originalFolder = {name:..., description:...} >> folder lazy loading
  const folderName = formData.get("folderName");
  const description = formData.get("description");
  if (
    folderName === originalFolder.name &&
    description === originalFolder.description
  ) {
    return { error: "No changes detected" };
  }
  try {
    await put(`/folders/${params.folderId}`, {
      name: folderName,
      description,
    });
    return redirect("/notes");
  } catch (error) {
    return { error: "Error updating folder" };
  }
}
