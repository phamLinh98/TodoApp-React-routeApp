import { defer, useParams, useLoaderData, useNavigate } from "react-router-dom";
import LazyLoading from "../../../../components/LazyLoading";
import AntdModal from "../../../../components/AntdModal";
import { get } from "../../../../utils/api";
//TODO: adding note
//TODO: solve antdModal
//TODO: adding loader and LazyLoading
//TODO: adding cancel button antd >> back to folder Id

const Note = () => {
  const { note } = useLoaderData();
  const navigate = useNavigate();
  const { folderId } = useParams();

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
            <AntdModal
              open={true}
              closable={true}
              onCancel={() => navigate("/folder/" + folderId)}
              footer={null}
              width={800}
            >
              <h1 className="text-2x1 font-semibold">Note Detail</h1>
              <div className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md shadow gap-2 mt-2 hover:shodow-lg transition duration-300 ease-in-out">
                <h2 className="text-lg font-semibold">Note {note.title}</h2>
                <div
                  className="text-sm text-gray-500"
                  dangerouslySetInnerHTML={{ _html: note.content }}
                ></div>
              </div>
            </AntdModal>
          );
        }}
      </LazyLoading>
    </>
  );
};

export default Note;

const loadNoteInfo = async (noteId) => {
  const response = await get(`/notes/${noteId}`);
  if (!response.ok) {
    throw new Error("Cant load note");
  }
  return response.json();
};

export const noteLoader = ({ params }) => {
  const noteId = params.noteId;
  return defer({
    note: loadNoteInfo(noteId),
  });
};
