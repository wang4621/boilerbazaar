import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState } from "react";
import MainPage from "./MainPage";
import "./App.css";
import ProtectedRoutes from "./component/ProtectedRoutes";

function App() {
  const [auth, setAuth] = useState(true);
  const [username, setUserName] = useState("");
  // console.log(auth)
  console.log(localStorage.getItem('auth'))

  return (
    <div className="appDisplay">
      <Routes>
        <Route
          path="/boilerbazaar"
          element={<Login setAuth={setAuth} setUserName={setUserName} />}
        />
        <Route element={<ProtectedRoutes auth={auth} />}>
          <Route
            path="/*"
            element={<MainPage username={username} setAuth={setAuth} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
