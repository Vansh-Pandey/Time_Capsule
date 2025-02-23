import React, { useEffect } from 'react';
import '../styling/About.css';

const About = () => {
  useEffect(() => {
    // Parallax effect for floating elements
    const handleScroll = () => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-speed');
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="about-page">
      {/* Animated background elements */}
      <div className="time-particles">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <header className="about-header">
        <div className="header-content">
          <h1 className="glowing-text">About Time Capsule</h1>
          <p className="subtitle parallax" >
            Preserving Memories, Inspiring Futures
          </p>
          <div className="header-decoration">
            <div className="time-circle"></div>
            <div className="time-spiral"></div>
          </div>
        </div>
      </header>

      <section className="about-content">
        <div className="about-section mission hover-card">
          <div className="section-icon">
            <div className="pulse-circle"></div>
            <i className="mission-icon">🎯</i>
          </div>
          <h2>Our Mission</h2>
          <p className="fade-in">
            Our mission is to empower you to capture and cherish every precious moment. With our secure and innovative platform, 
            we transform your memories into timeless treasures that connect generations.
          </p>
          <div className="card-glow"></div>
        </div>

        <div className="about-section vision hover-card">
          <div className="section-icon">
            <div className="pulse-circle"></div>
            <i className="vision-icon">🔮</i>
          </div>
          <h2>Our Vision</h2>
          <p className="fade-in">
            We envision a world where every memory is accessible, cherished, and shared. By merging advanced technology with heartfelt experiences,
            Time Capsule creates a legacy of moments that inspire, educate, and connect people worldwide.
          </p>
          <div className="card-glow"></div>
        </div>

        <div className="about-section values hover-card">
          <div className="section-icon">
            <div className="pulse-circle"></div>
            <i className="values-icon">💫</i>
          </div>
          <h2>Our Values</h2>
          <ul className="values-list">
            <li className="value-item fade-in">
              <div className="value-icon">⚡</div>
              <div className="value-content">
                <strong>Innovation</strong>
                <p>Harnessing cutting-edge technology to preserve your unique moments.</p>
              </div>
            </li>
            <li className="value-item fade-in">
              <div className="value-icon">🔒</div>
              <div className="value-content">
                <strong>Security</strong>
                <p>Your memories are safeguarded with state-of-the-art security measures.</p>
              </div>
            </li>
            <li className="value-item fade-in">
              <div className="value-icon">🤝</div>
              <div className="value-content">
                <strong>Community</strong>
                <p>We foster connection by celebrating shared experiences and building lasting bonds.</p>
              </div>
            </li>
          </ul>
          <div className="card-glow"></div>
        </div>
      </section>

      <footer className="about-footer">
        <div className="footer-content parallax" data-speed="0.1">
          <p>&copy; 2025 Time Capsule. All rights reserved.</p>
          <div className="footer-decoration"></div>
        </div>
      </footer>
    </div>
  );
};

export default About;