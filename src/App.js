import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import React from "react";
import MainPage from "./MainPage";
import './App.css'

function App() {
  return (
    <div className="appDisplay">
      <Routes>
        <Route path="/boilerbazaar" element={<Login />}/>
        <Route path="/*" element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;