import { Suspense } from "react";
import Item from "../../components/notes/item";
import { Spin } from "antd";
import { Await, defer, Outlet, useLoaderData } from "react-router-dom";

const Notes = () => {
  const { events } = useLoaderData();

  return (
    <>
      <Suspense
        fallback={
          <Spin
            className="flex justify-center items-center h-full scale-[2] mt-36"
            tips="Loading"
            size="large"
            percent="auto"
          >
            <h1 className="text-2xl font-semibold">List Folders</h1>
          </Spin>
        }
      >
        <Await resolve={events}>
          <>
            <Suspense
              fallback={
                <Spin
                  className="flex justify-center items-center h-full scale-[2] mt-36"
                  tip="Loading"
                  size="large"
                  percent="auto"
                >
                  <h1 className="text-2xl font-semibold">List Folders</h1>
                </Spin>
              }
            >
              <Await resolve={events}>
                {(folders) => (
                  <>
                    <h1 className="text-2xl font-semibold">List Folders</h1>
                    <div className="flex flex-wrap gap-10 py-4 max-h-[calc(100vh-200px)] overflow-auto">
                      {folders.map((folder, index) => (
                        <Item
                          key={folder.id || index}
                          name={folder.name}
                          description={folder.description}
                        />
                      ))}
                    </div>
                  </>
                )}
              </Await>
            </Suspense>
          </>
        </Await>
      </Suspense>
      <Outlet />
    </>
  );
};

export default Notes;

export const loadEvents = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });

  const response = await fetch("http://localhost:3456/folders", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
