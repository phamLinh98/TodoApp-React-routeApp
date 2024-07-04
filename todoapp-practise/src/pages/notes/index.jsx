const Notes = () => {
  return (
    <>
      <h1 className="text-2xl font-semibold">List Note</h1>
      {[1, 2, 3, 4, 5].map((item) => {
        <div
          key={item}
          className="flex flex-col space-y-2 p-4 border-gray-200 rounded-md shadow gap-2 mt-2 hover:shodow-lg transition duration-300 ease-in-out"
        >
          <h2 className="text-lg font-semibold">Note {item}</h2>
          <p className="text-sm text-gray-500">
            This is contend of Note {item}
          </p>
        </div>;
      })}
    </>
  );
};

export default Notes;
