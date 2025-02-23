import React, { useState } from "react";
import "../styling/CreateCapsule.css";

const CreateCapsule = ({ onClose }) => {
  const [capsuleType, setCapsuleType] = useState("text");
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [unlockDate, setUnlockDate] = useState("");
  const [collaborators, setCollaborators] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const capsuleData = {
      type: capsuleType,
      content,  
      privacy,
      unlockDate,
      collaborators: collaborators.split(",").map((email) => email.trim()),
    };
    console.log("Capsule Created:", capsuleData);
    onClose();
  };

  return (
    <div className="createcapsule-page">
      <div className="capsule-container">
        {/* Close Button */}
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <h2>Create a Memory Capsule</h2>

        <form className="createcapsule-form" onSubmit={handleSubmit}>
          {/* Capsule Type Selection */}
          <label htmlFor="capsuleType">Capsule Type:</label>
          <select
            id="capsuleType"
            value={capsuleType}
            onChange={(e) => setCapsuleType(e.target.value)}
          >
            <option value="text">Text</option>
            <option value="multimedia">Multimedia</option>
            <option value="event">Event</option>
          </select>

          {/* Capsule Content */}
          <label htmlFor="content">Content:</label>
          {capsuleType === "text" ? (
            <textarea
              id="content"
              placeholder="Write your memory..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          ) : (
            <input
              id="content"
              type="file"
              accept="image/*,video/*"
              onChange={(e) => setContent(e.target.files[0])}
              required
            />
          )}

          {/* Privacy Settings */}
          <label htmlFor="privacy">Privacy:</label>
          <select
            id="privacy"
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
          >
            <option value="private">Private</option>
            <option value="shared">Shared</option>
          </select>

          {/* Time-lock Feature */}
          <label htmlFor="unlockDate">Unlock Date:</label>
          <input
            id="unlockDate"
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            required
          />

          {/* Collaboration (if shared) */}
          {privacy === "shared" && (
            <>
              <label htmlFor="collaborators">
                Collaborators (comma-separated emails):
              </label>
              <input
                id="collaborators"
                type="text"
                placeholder="Enter emails..."
                value={collaborators}
                onChange={(e) => setCollaborators(e.target.value)}
              />
            </>
          )}

          <button type="submit" className="create-button">
            Create Capsule
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCapsule;
