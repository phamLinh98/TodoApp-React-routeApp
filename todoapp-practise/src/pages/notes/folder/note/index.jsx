import { useParams } from "react-router-dom";
//TODO: solve load folder
//TODO: params asyns
//TODO: for list, loader
//TODO: solve Lazy loading here
//TODO: solbe loader event, data json
//TODO: custom component lazyloading for many times

const Note = () => {
  const { noteId } = useParams();
  return (
    <>
      <h1 className="text-2x1 font-semibold">Note Detail</h1>
      <div className="flex flex-col space-y-2 p-4 border border-gray-200 rounded-md shadow gap-2 mt-2 hover:shodow-lg transition duration-300 ease-in-out">
        <h2 className="text-lg font-semibold">Note {noteId}</h2>
        <p className="text-sm text-gray-500">
          This is content of Note {noteId}
        </p>
      </div>
    </>
  );
};

export default Note;
