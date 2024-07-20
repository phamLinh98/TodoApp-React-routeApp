import { RouterProvider } from "react-router-dom";
import "./App.scss";
import router from "./pages/routers/root";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
