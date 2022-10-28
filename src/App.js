import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import React, { useState } from "react";
import MainPage from "./MainPage";
import './App.css'
import ProtectedRoutes from "./component/ProtectedRoutes";

function App() {
  const [auth, setAuth] = useState(false);
  console.log(auth)

  return (
    <div className="appDisplay">
      <Routes>
        <Route path="/boilerbazaar" element={<Login setAuth={setAuth}/>}/>
        <Route element={<ProtectedRoutes auth={auth}/>}>
          <Route path="/*" element={<MainPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;