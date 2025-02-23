import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter,Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import { useAuthStore } from "./store/useAuthStore";
import Profile from "./pages/Profile";
import CreateCapsule from "./pages/CreateCapsule";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { ToastContainer } from "react-toastify";
// import {Toaster} from "react-hot-toast";
const App = () => {
  const { authUser, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);  
  console.log({ authUser });
  return (
    
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={1000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/create-capsule" element={<CreateCapsule />} />
        <Route path="/profile" element={authUser?<Profile />:<Navigate to="/"/>} />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/" />}
        />
      </Routes>
      </BrowserRouter>
  );
};

export default App;
