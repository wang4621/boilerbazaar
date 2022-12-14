import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import React, { useState, useEffect } from "react";
import MainPage from "./MainPage";
import "./App.css";
import ProtectedRoutes from "./component/ProtectedRoutes";

function App() {
  const [auth, setAuth] = useState(false);
  const [username, setUserName] = useState("");
  // console.log(auth)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        // console.log("here")
      setAuth(true);
      setUserName(loggedInUser);
      // console.log(location)
      if (location.pathname === "/boilerbazaar") {
        navigate("/home")
      } else {
        navigate(location.pathname)
      }
      
    }
  }, []);

  return (
    <div className="appDisplay">
      <Routes>
        <Route
          path="/boilerbazaar"
          element={<Login setAuth={setAuth} setUserName={setUserName} />}
        />
        <Route element={<ProtectedRoutes auth={auth}/>}>
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
