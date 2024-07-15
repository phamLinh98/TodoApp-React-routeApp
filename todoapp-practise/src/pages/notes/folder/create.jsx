import { Button, Input } from "antd";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { post } from "../../../utils/api";

const CreateFolder = () => {
  const navigation = useNavigation();
  const actionData = useActionData();
  const isSubmiting = navigation.state === "submitting";

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-semibold mb-4">Create Folder</h1>
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
export default CreateFolder;

export async function action({ request }) {
  const formData = await request.formData();
  const folderName = formData.get("folderName");
  const description = formData.get("description");
  try {
    await post("/folders", {
      name: folderName,
      description,
    });
    return redirect("/notes");
  } catch (error) {
    return { error: "Error creating folder" };
  }
}
