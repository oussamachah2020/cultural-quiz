import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import UserProvider from "./context/User";
import { defineCustomElements } from "@ionic/pwa-elements/loader";

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
