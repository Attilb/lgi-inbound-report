import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import NewReport from "./pages/NewReport.jsx";
import Photos from "./pages/Photos.jsx";
import Closeout from "./pages/Closeout.jsx";
import Preview from "./pages/Preview.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/new-report" element={<NewReport />} />
      <Route path="/photos" element={<Photos />} />
      <Route path="/closeout" element={<Closeout />} />
      <Route path="/preview" element={<Preview />} />
    </Routes>
  );
}