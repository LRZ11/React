import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginLayout from "./Shared/LoginLayout";
import MainLayout from "./Shared/MainLayout";
import './App.css';

export default function App() {
  return (
    <div className="lightbackground">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginLayout />} />
          <Route path="/Home" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
