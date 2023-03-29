import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserProvider from "./context/User";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <UserProvider>
    <App />
    <ToastContainer />
  </UserProvider>
);
