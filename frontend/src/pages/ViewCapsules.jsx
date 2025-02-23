import React from 'react'

const ViewCapsules = () => {
  return (
    <div className="view-container capsule-view">
    <h2>My Capsules</h2>
    <div className="capsules-grid">
      {capsules.map((capsule) => (
        <div key={capsule.id} className="capsule-card">
          <Camera />
          <h3>{capsule.title}</h3>
          <p>{capsule.date}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default ViewCapsules
