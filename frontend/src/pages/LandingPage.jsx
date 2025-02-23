import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import "../styling/LandingPage.css";
import Login from "./Login";

const IntroPage = () => {
  const { authUser, checkAuth } = useAuthStore();
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Attach bubble creation to the entire body
  useEffect(() => {
    const createBubble = (e) => {
      let x, y;
      // For touch devices
      if (e.touches && e.touches[0]) {
        x = e.touches[0].clientX;
        y = e.touches[0].clientY;
      } else {
        x = e.clientX;
        y = e.clientY;
      }

      // Create a bubble element dynamically
      const bubble = document.createElement("div");
      bubble.className = "bubble";

      // Set a random size between 50 and 70px
      const size = Math.random() * 20 + 50;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;

      // Center the bubble on the click/touch position
      bubble.style.left = `${x - size / 2}px`;
      bubble.style.top = `${y - size / 2}px`;

      // Append the bubble to the document body
      document.body.appendChild(bubble);

      // Remove the bubble after the animation duration (2s)
      setTimeout(() => {
        bubble.remove();
      }, 2000);
    };

    // Add event listeners for both click and touchstart events
    document.body.addEventListener("click", createBubble);
    document.body.addEventListener("touchstart", createBubble);

    // Cleanup event listeners on unmount
    return () => {
      document.body.removeEventListener("click", createBubble);
      document.body.removeEventListener("touchstart", createBubble);
    };
  }, []);

  // Prevent bubble generation when clicking the button by stopping event propagation
  const openPanel = (e) => {
    e.stopPropagation();
    if (authUser) {
      navigate("/home");
    } else {
      setIsPanelOpen(true);
    }
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  return (
    <div className="mainContainer">
      {/* Top Bar with basic navigation options */}
      <div className="top-bar-1">
        <div className="logo" onClick={() => navigate("/")}>
          Krack Hack
        </div>
        <nav className="nav-options">
          <div>
          <a href="/" className="nav-link">Home</a>
          </div>
          <div>
          <a href="/about" className="nav-link">About</a>
          </div>
          <div>
          <a href="/contact" className="nav-link">Contact</a>
          </div>
        </nav>
      </div>

      <div className="form-floating-letters">
        {Array.from({ length: 60 }, (_, i) => (
          <span
            className="form-floating-letter form-rotating-letter"
            key={i}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${Math.random() * 1 + 1}rem`,
            }}
          >
            {[
              "KrackHack",
              "V",
              "A",
              "N",
              "S",
              "H",
              "L",
              "A",
              "V",
              "Krackhack",
              "Vansh",
              "Lav",
            ][Math.floor(Math.random() * 14)]}
          </span>
        ))}
      </div>

      <div className="main-content-1">
        <h1 className="heading-1">Time Capsule</h1>
        <div className="quote">GDG Hackathon</div>
        <button className="get-started" onClick={openPanel}>
          Let's Go
        </button>
        <div class="pokeball"></div>
      </div>

      {/* Render the Login component if the panel is open */}
      {isPanelOpen && <Login closePanel={closePanel} />}
    </div>
  );
};

export default IntroPage;
