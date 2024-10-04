import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  redirect,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Commands from "./pages/Commands";
import AppLayout from "./pages/AppLayout";
import Speech from "./components/Speech";
import { Context } from "./contexts/Context.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import { v4 as uuidv4 } from "uuid";
import { useContext, useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";
import axios from "axios";
import Register from "./pages/Register";
import AuthProvider from "./contexts/AuthContext.jsx";
import Logout from "./pages/Logout.jsx";
import Fav from "./pages/Fav.jsx";

function App() {
  const { setarr } = useContext(Context);
  const { token, currUser } = useAuth();

  let ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  useEffect(() => {
    async function getData() {
      if (currUser) {
        await axios
          .get(`${import.meta.env.VITE_API_URL}/todo/${currUser._id}/todos`)
          .then((res) => {
            setarr(res.data);
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    getData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* UnProtected Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="fav" element={<Fav />} /> */}
        <Route path="fav" element={<ProtectedRoute children={<Fav />} />} />
        {/* Protected Routes */}
        <Route
          path="profile"
          element={<ProtectedRoute children={<Profile />} />}
        />
        <Route
          path="logout"
          element={<ProtectedRoute children={<Logout />} />}
        />
        <Route
          path="app"
          element={<ProtectedRoute children={<AppLayout />} />}
        />
        {redirect}
        <Route
          path="speech"
          element={<ProtectedRoute children={<Speech />} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
