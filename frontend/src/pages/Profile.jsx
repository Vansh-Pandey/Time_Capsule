import React, { useEffect, useRef } from "react";
import { useProfileStore } from "../store/useProfileStore.js";
import { useAuthStore } from "../store/useAuthStore.js";
import { useNavigate } from "react-router-dom";
import "../styling/Profile.css";

const Profile = ({ onClose = () => {} }) => {
  const { authUser } = useAuthStore();
  const { profile, fetchProfile, isFetchingProfile } = useProfileStore();
  const navigate = useNavigate();
  const profileRef = useRef(null); // Ref for clicking outside

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    // Function to close profile when clicking outside
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        if (typeof onClose === "function") {
          onClose();
        } else {
          console.error("onClose is not a function");
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (isFetchingProfile || !profile) {
    return <div className="loading-message">Loading profile...</div>;
  }

  const generateAchievements = (capsuleCount) => {
    const achievements = [];
    if (capsuleCount >= 5) achievements.push("You've created 5 time capsules!");
    if (capsuleCount >= 10) achievements.push("10 time capsules created! Keep capturing memories!");
    if (capsuleCount >= 20) achievements.push("20 time capsules, you're a true memory keeper!");
    if (capsuleCount >= 50) achievements.push("50 time capsules! Your journey is epic!");
    return achievements;
  };

  const achievements = generateAchievements(profile.TimeCapsuleCount);
  const brightColors = ["color-1", "color-2", "color-3", "color-4", "color-5"];

  return (
    <div className="profile-overlay">
      <div className="profile-section" ref={profileRef}>
        {/* Close Button */}
        <button className="close-button-1" onClick={onClose}>
          ×
        </button>

        {/* Profile Header */}
        <div className="profile-header">
          <img src="/user.jpg" alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <div className="name">{profile.Username || "John Doe"}</div>
            <div className="email">{profile.Email}</div>
          </div>
        </div>

        {/* Time Capsule Stats Section */}
        <div className="stats-section">
          <div className="stat-heading">Time Capsule Stats</div>
          <div className="stats-row">
            <div className="stat-block">
              <div className="stat-label">Total Time Capsules</div>
              <div className="stat-value">{profile.TimeCapsuleCount}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Friends</div>
              <div className="stat-value">{profile.FriendsCount}</div>
            </div>
            <div className="stat-block">
              <div className="stat-label">Shared Capsules</div>
              <div className="stat-value">{profile.SharedCapsuleCount}</div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="achievements-section">
          <div className="achievement-heading">Achievements</div>
          <div className="achievements-carousel">
            {achievements.length > 0 ? (
              achievements.map((achievement, index) => (
                <div key={index} className={`achievement-card ${brightColors[index % brightColors.length]}`}>
                  <blockquote className="achievement-quote">{achievement}</blockquote>
                </div>
              ))
            ) : (
              <div>No achievements yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
