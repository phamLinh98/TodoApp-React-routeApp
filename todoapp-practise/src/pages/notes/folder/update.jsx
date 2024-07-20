import { Button, Input } from "antd";
import { useActionData, useNavigation, Form } from "react-router-dom";
import { put } from "../../../utils/api";
import { redirect } from "react-router-dom";
import LazyLoading from "../../../components/LazyLoading";

const UpdateFolder = () => {
  const navigate = useNavigation();
  const actionData = useActionData();
  const isSubmiting = navigate.state === "submitting";
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
                <Input.TextArea
                  id="description"
                  name="description"
                  required
                  className="w-full"
                  disabled={isSubmiting}
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
              <div className="text-right">
                <Button type="primary" htmlType="submit">
                  {isSubmiting ? "Submiting..." : "Submit"}
                </Button>
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
