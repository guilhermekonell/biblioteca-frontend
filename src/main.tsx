import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "./global.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "./components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Toaster position="top-right" duration={3000} />
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
