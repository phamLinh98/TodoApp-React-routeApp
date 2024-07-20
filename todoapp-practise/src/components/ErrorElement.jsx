import { isRouteErrorResponse, useRouteError } from "react-router-dom";
const ErrorElement = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 404:
        return 123;
      default:
        break;
    }
  }
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold"> Something went wrong</h1>
      <div className="text-orange-500">Error message: {error.message}</div>
    </div>
  );
};

export default ErrorElement;
