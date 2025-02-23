import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import Signup from "./Signup";
import "../styling/Login.css"; // Make sure this file includes the necessary CSS and animations
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ closePanel }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeView, setActiveView] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  // Refs for the inputs
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData);
    if (success) {
      navigate("/home");
    }
  };

  // Effect for focus/blur animations on the eyeballs and hands
  useEffect(() => {
    const eyeballL = document.querySelector(".eyeball-l");
    const eyeballR = document.querySelector(".eyeball-r");

    const normalEyeStyle = () => {
      if (eyeballL) {
        eyeballL.style.left = "0.6em";
        eyeballL.style.top = "0.6em";
      }
      if (eyeballR) {
        eyeballR.style.right = "0.6em";
        eyeballR.style.top = "0.6em";
      }
    };

    

    const handleNonPasswordFocus = () => {
      if (eyeballL) {
        eyeballL.style.cssText = `left: 0.75em; top: 1em;`;
      }
      if (eyeballR) {
        eyeballR.style.cssText = `right: 0.75em; top: 1em;`;
      }
      // normalEyeStyle();
    };

    const handlePasswordFocus = () => {
      
      normalEyeStyle();
    };

    const usernameInput = usernameRef.current;
    const passwordInput = passwordRef.current;

    if (usernameInput) {
      usernameInput.addEventListener("focus", handleNonPasswordFocus);
    }
    if (passwordInput) {
      passwordInput.addEventListener("focus", handlePasswordFocus);
    }

    return () => {
      if (usernameInput) {
        usernameInput.removeEventListener("focus", handleNonPasswordFocus);
      }
      if (passwordInput) {
        passwordInput.removeEventListener("focus", handlePasswordFocus);
      }
    };
  }, [activeView]);

  // Watch the password value to "close" the eyes by toggling the "closed" class on the eyeballs.
  useEffect(() => {
    const eyeL = document.querySelector(".eyeLeft");
    const eyeR = document.querySelector(".eyeRight");
    const eyeballL = document.querySelector(".eyeball-l");
    const eyeballR = document.querySelector(".eyeball-r");
    if (formData.password.length > 0) {
      eyeballL && eyeballL.classList.add("closed");
      eyeballR && eyeballR.classList.add("closed");
      eyeL && eyeL.classList.add("closed");
      eyeR && eyeR.classList.add("closed");
      
    } else {
      eyeballL && eyeballL.classList.remove("closed");
      eyeballR && eyeballR.classList.remove("closed");
      eyeL && eyeL.classList.remove("closed");
      eyeR && eyeR.classList.remove("closed");
    }
  }, [formData.password]);

  return (
    <div className="wrapper">
      <div className="overlay" onClick={closePanel}></div>
      {activeView === "login" && (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email:</label>
            <input
              ref={usernameRef}
              type="text"
              id="username"
              name="email"
              placeholder="Enter your email..."
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter your password..."
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Panda Interactive Elements */}
          <div id="head">
            <div className="face">
              <div className="hair"></div>
              <div className="eyebrowLeft"></div>
              <div className="eyebrowRight"></div>
              {/* Eye containers with eyeballs inside */}
              <div className="eyeLeft">
                <div className="eyeball-l"></div>
              </div>
              <div className="eyeRight">
                <div className="eyeball-r"></div>
              </div>
              <div className="mouth"></div>
            </div>
          </div>

          <div className="register-link">
            <p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveView("signup");
                }}
              >
                Signup
              </a>
            </p>
          </div>
        </div>
      )}

      {activeView === "signup" && (
        <Signup switchToLogin={() => setActiveView("login")} />
      )}

      <ToastContainer />
    </div>
  );
};

export default Login;
