import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ReportProvider } from "./context/ReportContext.jsx";

const container = document.getElementById("root");
createRoot(container).render(
  <React.StrictMode>
    <ReportProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ReportProvider>
  </React.StrictMode>
);
