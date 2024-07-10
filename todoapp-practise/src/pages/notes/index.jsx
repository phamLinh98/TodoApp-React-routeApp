import Item from "../../components/notes/item";

const Notes = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">List Note</h1>
      <div className="flex flex-wrap gap-10 mt-4 max-h-[calc(100vh-200px)] overflow-auto">
        {[...new Array(100)].map((_, index) => (
          <Item
            key={index}
            name={`Note ${index + 1}`}
            description={`This is the description of Note ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default Notes;
