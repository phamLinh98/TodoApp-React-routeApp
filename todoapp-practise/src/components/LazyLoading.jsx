import { Spin } from "antd";
import { Suspense } from "react";
import { Await, useLoaderData } from "react-router-dom";

const DefaultLoadingUI = () => {
  return (
    <Spin
      className="flex justify-center items-center h-full scale-[2] mt-36"
      size="large"
      percent="auto"
    ></Spin>
  );
};

const LazyLoading = ({ children, LoadingUI = DefaultLoadingUI }) => {
  const { event } = useLoaderData();
  return (
    <Suspense fallback={<LoadingUI />}>
      <Await resolve={event}>{children}</Await>
    </Suspense>
  );
};

export default LazyLoading;
