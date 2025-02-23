import React, { useState } from "react";
import Profile from "../pages/Profile";

const ParentComponent = () => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div>
      <button onClick={() => setShowProfile(true)}>Open Profile</button>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </div>
  );
};

export default ParentComponent;
