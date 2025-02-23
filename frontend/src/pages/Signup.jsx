import React, { useState, useRef, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import "../styling/Login.css"; // Using the login styles so both views match
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ closePanel, switchToLogin }) => {
  const { signup, isRegistering } = useAuthStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  // Refs for interactive animations on panda elements
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email address");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const success = await signup(formData);
      if (success) {
        navigate("/home");
      }
    }
  };

  // Add interactive animations similar to the Login component
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
    };

    const handlePasswordFocus = () => {
      normalEyeStyle();
    };

    const fullNameInput = fullNameRef.current;
    const emailInput = emailRef.current;
    const passwordInput = passwordRef.current;

    fullNameInput && fullNameInput.addEventListener("focus", handleNonPasswordFocus);
    emailInput && emailInput.addEventListener("focus", handleNonPasswordFocus);
    passwordInput && passwordInput.addEventListener("focus", handlePasswordFocus);

    return () => {
      fullNameInput && fullNameInput.removeEventListener("focus", handleNonPasswordFocus);
      emailInput && emailInput.removeEventListener("focus", handleNonPasswordFocus);
      passwordInput && passwordInput.removeEventListener("focus", handlePasswordFocus);
    };
  }, []);

  // Toggle "closed" class on the eyeballs when password text is present
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
      {/* Optional overlay to close the panel */}
      {closePanel && <div className="overlay" onClick={closePanel}></div>}
      <div className="container">
        {/* Panda Interactive Elements */}
        <div id="head">
          <div className="face">
            <div className="hair"></div>
            <div className="eyebrowLeft"></div>
            <div className="eyebrowRight"></div>
            <div className="eyeLeft">
              <div className="eyeball-l"></div>
            </div>
            <div className="eyeRight">
              <div className="eyeball-r"></div>
            </div>
            <div className="mouth"></div>
          </div>
          
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name:</label>
          <input
            ref={fullNameRef}
            type="text"
            id="fullName"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <label htmlFor="email">Email:</label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            ref={passwordRef}
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={isRegistering}>
            {isRegistering ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="register-link">
          <p>
            {" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                switchToLogin();
              }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
