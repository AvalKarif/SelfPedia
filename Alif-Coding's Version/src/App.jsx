import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Login from "./pages/Login";
import { auth } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Update from "./pages/Update";
import Details from "./pages/Details";
import Tags from "./pages/Tags";
import Profile from "./pages/Profile";
import { isNull } from "lodash";
import Register from "./pages/Register";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, [auth]);

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route
          path="/create"
          element={!isNull(user) ? <Create /> : <Navigate to={"/"} />}
        />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/detail/:id" element={<Details user={user} />} />
        <Route path="/search" element={<Home user={user} />} />
        <Route path="/tags/:id" element={<Tags user={user} />} />
        <Route
          path="/profile"
          element={
            !isNull(user) ? <Profile user={user} /> : <Navigate to={"/"} />
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
