// import React, { useState, useEffect } from 'react';
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ChatBot from "../components/ChatBot.jsx";
import {
  Camera,
  Award,
  Bell,
  Settings,
  User,
  LogOut,
  PlusCircle,
  Home as HomeIcon,
  Calendar,
  Users,
  Star,
  Activity,
  BarChart,
  Clock,
  ChevronRight,
  MessageCircle,
  Edit,
} from "lucide-react";
import "../styling/Home.css";
// import Analytics from './Analytics.jsx';
// import CreateCapsule from './CreateCapsule.jsx'
// import MyCapsules from './MyCapsules.jsx'
// import MainSettings from './Settings.jsx'
// import Profile from './Profile.jsx'
// import Timeline from './Timeline.jsx'
// import ViewCapsules from './ViewCapsules.jsx';
import { useAuthStore } from "../store/useAuthStore.js";
import "../styling/Home.css";
import { useProfileStore } from "../store/useProfileStore.js";
import { useCapsulesStore } from "../store/useCapsulesStore.js";
import { toast } from "react-toastify";

// Placeholder components for different views
const DashboardView = ({ stats, achievements }) => (
  <>
    <div className="stats-grid">
      <div className="stat-card">
        <Camera className="stat-icon" />
        <h3>Total Capsules</h3>
        <div className="stat-value">{stats.totalCapsules}</div>
        <p>+0 from last week</p>
      </div>

      <div className="stat-card">
        <Users className="stat-icon" />
        <h3>Shared Memories</h3>
        <div className="stat-value">{stats.sharedCapsules}</div>
        <p>You have no friends 🥲</p>
      </div>

      <div className="stat-card">
        <Star className="stat-icon" />
        <h3>Achievements</h3>
        <div className="stat-value">{stats.achievements}</div>
        <p>No Achievments</p>
      </div>
    </div>

    <h2 style={{ margin: "2rem 0 1.5rem" }}>Recent Achievements</h2>
    <div className="achievements-grid">
      {achievements.map((achievement, index) => (
        <div key={index} className="achievement-card">
          <div className="achievement-icon">{achievement.icon}</div>
          <div>
            <h4>{achievement.title}</h4>
            <p>{achievement.description}</p>
          </div>
        </div>
      ))}
    </div>
  </>
);

// Placeholder Camera icon component
// const ProfileHeader = () => {
//   const { profile, isFetchingProfile } = useProfileStore();
//   if (isFetchingProfile || !profile) {
//     return <div className="profile-header">Loading Profile...</div>;
//   }
//   return (
//     <div className="profile-header">
//       <img
//         src={profile.profilePicture || "default-avatar.png"}
//         alt="Avatar"
//         className="profile-header-avatar"
//       />
//       <div className="profile-header-info">
//         <h3>{profile.Username}</h3>
//         <p>{profile.Email}</p>
//       </div>
//     </div>
//   );
// };

import { FaLock } from "react-icons/fa"; // Import lock icon

const CapsuleView = () => {
  const { getCapsules } = useCapsulesStore();
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCapsules = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedCapsules = await getCapsules();
      console.log("Fetched Capsules in jsx:", fetchedCapsules);
      setCapsules(fetchedCapsules || "");
    } catch (err) {
      setError(err.message || "Failed to load capsules.");
    } finally {
      setLoading(false);
    }
  }, [getCapsules]);

  useEffect(() => {
    fetchCapsules();
  }, [fetchCapsules]);

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
  
  return (
    <div className="view-container capsule-view">
      <h2>My Capsules</h2>

      {loading ? (
        <p>Loading capsules...</p>
      ) : error ? (
        <p style={{ color: "red" }}>Error loading capsules: {error}</p>
      ) : capsules.length === 0 ? (
        <p style={{ color: "blue" }}>No capsules found.</p>
      ) : (
        <div className="capsules-grid">
          {capsules.map((capsule) => {
            const releaseDate = new Date(capsule.openDate)
              .toISOString()
              .split("T")[0];
            const closeDate = new Date(capsule.closeDate)
              .toISOString()
              .split("T")[0];
            const isLocked = today < closeDate; // Lock if today is on/after close date

            return (
              <div
                key={capsule._id}
                className="capsule-card"
                style={{ position: "relative" }}
              >
                <h3>{capsule.title}</h3>
                <p>{capsule.description}</p>
                <p>Release Date: {closeDate}</p>

                {/* Capsule Content */}
                <div
                  className={
                    isLocked ? "capsule-content locked" : "capsule-content"
                  }
                >
                  {releaseDate <= today && ( // ✅ FIXED: Changed `<==` to `<=`
                    <>
                      {/* Display Images */}
                      {Array.isArray(capsule.images) &&
                      capsule.images.length > 0 ? (
                        capsule.images.map((img, index) => {
                          const correctedImg = img.includes("https://")
                            ? "https://" + img.split("https://")[1]
                            : img;
                          return (
                            <img
                              key={index}
                              src={correctedImg}
                              alt={`Capsule Image ${index}`}
                              style={{ width: "150px", borderRadius: "8px" }}
                            />
                          );
                        })
                      ) : (
                        <p>No images available</p>
                      )}

                      {/* Display Videos */}
                      {Array.isArray(capsule.videos) &&
                      capsule.videos.length > 0 ? (
                        capsule.videos.map((vid, index) => {
                          const correctedVid = vid.includes("https://")
                            ? "https://" + vid.split("https://")[1]
                            : vid;
                          return (
                            <video key={index} controls width="150px">
                              <source src={correctedVid} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          );
                        })
                      ) : (
                        <p>No videos available</p>
                      )}
                    </>
                  )}
                </div>

                {/* Locked Overlay */}
                {isLocked && (
                  <div className="locked-overlay">
                    <FaLock size={50} color="white" />
                    <p>Capsule is locked</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// /* Timeline View */
// const TimelineView = () => (
//   <div className="view-container timeline-view">
//     <ProfileHeader />
//     <h2>Memory Timeline</h2>
//     <div className="timeline">
//       <div className="timeline-item">
//         <div className="timeline-date">July 15, 2024</div>
//         <div className="timeline-content">
//           "Summer Memories" capsule created.
//         </div>
//       </div>
//       <div className="timeline-item">
//         <div className="timeline-date">April 10, 2024</div>
//         <div className="timeline-content">
//           "Spring Awakening" capsule created.
//         </div>
//       </div>
//     </div>
//   </div>
// );

// /* Friends View */
// const FriendsView = () => (
//   <div className="view-container friends-view">
//     <ProfileHeader />
//     <h2>Friends</h2>
//     <div className="friends-grid">
//       <div className="friend-card">
//         <div className="friend-avatar">👤</div>
//         <h3>John Doe</h3>
//       </div>
//       <div className="friend-card">
//         <div className="friend-avatar">👤</div>
//         <h3>Jane Smith</h3>
//       </div>
//     </div>
//   </div>
// );

// /* Achievements View */
// const AchievementsView = () => (
//   <div className="view-container achievements-view">
//     <ProfileHeader />
//     <h2>All Achievements</h2>
//     <div className="achievements-list">
//       <div className="achievement-item">
//         <h3>First Capsule Created</h3>
//         <p>Congratulations on creating your first capsule!</p>
//       </div>
//       <div className="achievement-item">
//         <h3>50 Memories Captured</h3>
//         <p>You have captured 50 memories across your capsules.</p>
//       </div>
//     </div>
//   </div>
// );
/* Profile View */
const ProfileView = () => {
  const { updateProfile, profile, fetchProfile, isFetchingProfile } =
    useProfileStore();
  const { authUser } = useAuthStore();
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    // Set profile picture from fetched profile if available
    if (profile?.profilePic) {
      setProfilePicture(profile.profilePic);
    }
  }, [profile]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePic", file);
    console.log(formData)
    updateProfile(formData).then(() => {
      // Create a temporary preview for instant UI feedback
      const imageUrl = URL.createObjectURL(file);
      setProfilePicture(imageUrl);
    });
  };

  // Guard: Render a loading message until the profile is available.
  if (isFetchingProfile || !profile) {
    return <div>Loading Profile...</div>;
  }

  return (
    <div className="view-container profile-view">
      <h2>My Profile</h2>
      <div className="profile-content">
        <div className="profile-avatar">
          {profilePicture ? (
            <img
              src={profilePicture}
              alt="Profile"
              className="profile-picture"
            />
          ) : (
            <span>👤</span>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="profile-picture-input"
            id="profile-picture-input"
          />
        </div>
        <div className="profile-details">
          <h3>{profile.Username}</h3>
          <p>{profile.Email}</p>
        </div>
      </div>
    </div>
  );
};

/* Create Capsule View */

const CreateCapsuleView = () => {
  const { createCapsule } = useCapsulesStore();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    releaseDate: "",
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Convert file to Base64

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) setImage(file); // Store raw file
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    if (file) setVideo(file); // Store raw file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.releaseDate) {
      toast.error("Title and release date are required.");
      return;
    }
    setIsCreating(true);
    // ✅ Use FormData for multipart file upload
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("releaseDate", formData.releaseDate);
    data.append("openDate", new Date().toISOString()); // Current date

    if (image) data.append("images", image);
    console.log("image: ", image);
    if (video) data.append("videos", video);
    console.log("video: ", video);
    console.log("Uploading capsule:", data);

    const success = await createCapsule(data);

    if (success) {
      toast.success("Capsule created successfully!" ,{autoClose:1000});
      setFormData({ title: "", description: "", releaseDate: "" });
      setImage(null);
      setVideo(null);
    } else {
      toast.error("Failed to create capsule.");
    }
    setIsCreating(false);
  };

  return (
    <div className="view-container create-capsule-view">
      <h2>Create a Time Capsule</h2>
      <form className="create-form" onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            name="title"
            type="text"
            placeholder="Enter capsule title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name="description"
            placeholder="Enter capsule description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Release Date:
          <input
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Upload Image:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <label>
          Upload Video:
          <input type="file" accept="video/*" onChange={handleVideoChange} />
        </label>
        <button type="submit" className="create-button" disabled={isCreating}>
          {isCreating ? "Creating..." : "Create Capsule"}
        </button>
      </form>
    </div>
  );
};

/* Settings View */
const SettingsView = () => (
  <div className="view-container settings-view">
    <h2>Settings</h2>
    <div className="settings-content">
      {/* Example settings options */}
      <label>
        Dark Mode:
        <input type="checkbox" />
      </label>
      <label>
        Notifications:
        <input type="checkbox" />
      </label>
      <button type="button" className="save-settings-button">
        Save Settings
      </button>
    </div>
  </div>
);

const Home = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [activeNav, setActiveNav] = useState("dashboard");
  const { authUser, logout } = useAuthStore();
  const [stats] = useState({
    totalCapsules: 0,
    sharedCapsules: 0,
    achievements: 0,
  });

  const achievements = [
    {
      icon: <Star />,
      title: "First Capsule",
      description: "Create your first memory capsule",
    },
    {
      icon: <Users />,
      title: "Achiever",
      description: "Create your capsules for better future",
    },
    {
      icon: <Clock />,
      title: "Time Keeper",
      description: "Active for 30 days",
    },
    {
      icon: <Activity />,
      title: "Trending",
      description: "Our cool seniors are reviewing this site right now!!",
    },
  ];

  const navItems = [
    { id: "dashboard", icon: <HomeIcon size={20} />, label: "Dashboard" },
    { id: "capsules", icon: <Camera size={20} />, label: "My Capsules" },
    // { id: "calendar", icon: <Calendar size={20} />, label: "Timeline" },
    // { id: "social", icon: <Users size={20} />, label: "Friends" },
    // { id: "achievements", icon: <Award size={20} />, label: "Achievements" },
  ];

  const additionalOptions = [
    // { id: "chat", icon: <MessageCircle size={20} />, label: "Chat" },
    { id: "profile", icon: <User size={20} />, label: "Profile" },
    { id: "create", icon: <PlusCircle size={20} />, label: "Create Capsule" },
    // { id: "settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  const renderContent = () => {
    switch (activeNav) {
      case "dashboard":
        return <DashboardView stats={stats} achievements={achievements} />;
      case "capsules":
        return <CapsuleView />;
      case "calendar":
        return <TimelineView />;
      case "social":
        return <FriendsView />;
      case "achievements":
        return <AchievementsView />;

      case "chat":
        return <ChatView />;
      case "profile":
        return <ProfileView />;
      case "create":
        return <CreateCapsuleView />;
      case "settings":
        return <SettingsView />;
      default:
        return <DashboardView stats={stats} achievements={achievements} />;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setXp((prev) => (prev < 1000 ? prev + 1 : prev));
    }, 100);
    return () => clearInterval(interval);
  }, []);
  const handleLogout = async () => {
    await logout();
    toast.success("You have been logged out.", {
      position: "top-right",
      autoClose: 200,
    });
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Capsule Memory</div>

        <nav className="nav-menu">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`nav-item ${activeNav === item.id ? "active" : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {activeNav === item.id && (
                <ChevronRight size={16} style={{ marginLeft: "auto" }} />
              )}
            </div>
          ))}
        </nav>

        <div className="additional-options">
          {additionalOptions.map((option) => (
            <div
              key={option.id}
              className={`nav-item ${activeNav === option.id ? "active" : ""}`}
              onClick={() => setActiveNav(option.id)}
            >
              {option.icon}
              <span>{option.label}</span>
              {activeNav === option.id && (
                <ChevronRight size={16} style={{ marginLeft: "auto" }} />
              )}
            </div>
          ))}
        </div>

        <div className="bottom-nav">
          <div className="nav-item" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div className="level-indicator">
            <Award size={20} />
            <span>Level {level}</span>
            <div className="xp-bar">
              <div
                className="xp-progress"
                style={{ width: `${(xp % 1000) / 10}%` }}
              />
            </div>
            <span>{xp}/1000 XP</span>
          </div>

          <div className="user-section">
            <button className="nav-button">
              <div onClick={()=>setActiveNav("capsules")}>
              <Bell size={24} />
              <span className="notification-badge">0</span>
              </div>
            </button>
            <div className="user-avatar" onClick={()=>setActiveNav("profile")}>
              <User size={28} />
            </div>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="content-container">{renderContent()}</div>
      </main>
      <ChatBot/>
    </div>
  );
};

export default Home;
