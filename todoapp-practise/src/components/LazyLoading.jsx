import { Spin } from "antd";
import { Suspense } from "react";
import { Await } from "react-router-dom";

const DefaultLoadingUI = () => {
  return (
    <Spin
      className="flex justify-center items-center h-full scale-[2] -translate-x-5 mt-14 mb-16"
      size="large"
    ></Spin>
  );
};

const LazyLoading = ({ event, children, LoadingUI = DefaultLoadingUI }) => {
  return (
    <Suspense fallback={<LoadingUI />}>
      <Await resolve={event}>{children}</Await>
    </Suspense>
  );
};

export default LazyLoading;
