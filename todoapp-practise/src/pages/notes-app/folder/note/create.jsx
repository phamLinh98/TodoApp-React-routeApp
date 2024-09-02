import { Form, useActionData, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate, useNavigation, redirect } from "react-router-dom";
import AntdModal from "../../../../components/Models";
import { Button, Input } from "antd";
import NoteEditor from "../../../../components/notes/note/NoteEditor";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { post } from "../../../../utils/api";

const CreateNote = () => {
  const { folderId } = useParams();
  const [viewContent, setViewContent] = useState(false);
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  return (
    <AntdModal open={true} closable={false} footer={null} width={800}>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-4">Create Note</h1>
        <Form method="post">
          <div className="mb-4">
            <label htmlFor="noteTitle" className="block mb-2">
              Note Name
            </label>
            <Input
              id="noteTitle"
              name="noteTitle"
              required
              className="w-full"
              disabled={isSubmitting}
              placeholder="Folder name is email address"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block mb-2">
              Content
            </label>
            <Input id="content" name="content" value={content} />
            <div className="border border-gray-200 rounded-md p-2 mt-2">
              <NoteEditor onChangeContent={setContent} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button type="default" onClick={() => setViewContent(!viewContent)}>
              {viewContent ? <EyeInvisibleOutlined /> : <EyeOutlined />}
              {viewContent ? "Hide" : "View"} Content
            </Button>
            <Button type="primary" htmlType="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              type="dashed"
              onClick={() => navigate("/folders/" + folderId)}
            >
              Cancel
            </Button>
          </div>
          {viewContent && (
            <div
              className="rich-text mt-2 border border-gray-200 rounded-md p-2 max-h-[30vh] overflow-auto"
              dangerouslySetInnerHTML={{ __html: content }}
            ></div>
          )}
        </Form>
        {actionData && actionData.error && (
          <p className="text-red-500 mt-4">{actionData.error}</p>
        )}
      </div>
    </AntdModal>
  );
};

export default CreateNote;

export async function createNoteAction({ request }) {
  const formData = await request.formData();
  const noteTitle = formData.get("noteTitle");
  const content = formData.get("content");

  try {
    await post("/notes", { name: noteTitle, content });
    return redirect(`/notes`);
  } catch (error) {
    return { error: "Failed to create user. Please try again" };
  }
}
