import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NextUIProvider>
      <ToastContainer
        autoClose={3000}
        hideProgressBar={true}
        position='top-right'
      />
      <App />
    </NextUIProvider>
  </StrictMode>
);
