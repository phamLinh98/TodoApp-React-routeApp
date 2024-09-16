import { useState } from "react";
import LazyLoading from "../../../../components/LazyLoading";
import { Input } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import AntdModal from "../../../components/Models";

const UpdateNote = () => {
  const { folderId } = useParams();
  const { note } = useLoaderData();
  const [viewContent, setViewContent] = useState(false);
  const [content, setContent] = useState("");
  const navigation = useNavigation();
  const actionData = useActionData();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  return (
    <>
      <LazyLoading event={note}>
        {(note) => {
          if (!note) {
            return (
              <div className="flex justify-center items-center h-full">
                Dont have any note
              </div>
            );
          }
          return (
            <AntdModal open={true} closable={false} footer={null} width={800}>
              <div className="mb-4">
                <h1 className="text-2xl font-semibold mb-4">Update Note</h1>
                <Form method="post">
                  <div className="mb-4">
                    <label htmlFor="noteTitle" className="block mb-2">
                      Note Name
                    </label>
                    <Input
                      id="noteTitle"
                      name="noteTitle"
                      required
                      defaultValue={note.title}
                      className="w-full"
                      disabled={isSubmitting}
                      placeholder="Folder name is email address"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="content" className="block mb-2">
                      Content
                    </label>
                    <Input hidden id="content" name="content" value={content} />
                    <div className="border border-gray-200 rounded-md p-2 mt-2">
                      <NoteEditor onChangeContent={setContent} initialContent={note.content} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="default"
                        onClick={() => setViewContent(!viewContent)}
                      >
                        {viewContent ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                        {viewContent ? "Hide" : "View"} Content
                      </Button>
                      <Button type="primary" htmlFor="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting' : "Submit"}
                      </Button>
                      <Button type="dashed" onClick={()=> navigate('/folders/' + folderId)}>
                        Cancel
                      </Button>
                    </div>
                    {viewContent && (
                      <div 
                      className="rich-text mt-2 border border-gray-200 rounded-md p-2 max-h-[30vh] overflow-auto">
                      dangerouslySetInnerHTML={{__html:content}} />
                    )}
                </Form>
                {actionData && actionData.error && <p className="text-red-500 mt-4">{actionData.error}</p>}
              </div>

            </AntdModal>
          );
        }}
      </LazyLoading>
    </>
  );
};

export default UpdateNote;
