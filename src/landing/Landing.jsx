import React, { useRef, useState, useEffect } from "react";
import "./Landing.css";
import { Link, useNavigate } from "react-router-dom";

const sections = ["home", "about", "service", "models", "blog", "team", "contact"];

const heroImages = [
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
];

// Section images for About, Services, Team, Contact
const sectionImages = {
  about: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
  service: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
  team: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?auto=format&fit=crop&w=600&q=80",
  contact: "https://www.infotrack.com.au/wp-content/uploads/customer-support-team.jpg",
};

const Landing = () => {
  // Refs for smooth scroll
  const sectionRefs = sections.reduce((acc, value) => {
    acc[value] = useRef(null);
    return acc;
  }, {});

  // Hero image animation state
  const [heroIndex, setHeroIndex] = useState(0);
  const [fade, setFade] = useState(true);

  // Auth state (replace with your real auth logic)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeroIndex((prev) => (prev + 1) % heroImages.length);
        setFade(true);
      }, 500);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (e, section) => {
    e.preventDefault();
    if (sectionRefs[section] && sectionRefs[section].current) {
      sectionRefs[section].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="landing-root">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="landing-logo">PURE <span>ML</span></div>
        <ul>
          {sections.map((sec) => (
            <li key={sec}>
              {sec === "blog" ? (
                <Link to="/blogs">Blog</Link>
              ) : sec === "models" ? (
                <Link to="/models">Models</Link>
              ) : (
                <a
                  href={`#${sec}`}
                  onClick={e => handleNavClick(e, sec)}
                  className={sec === "home" ? "active" : ""}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1).replace("-", " ")}
                </a>
              )}
            </li>
          ))}
          {!isLoggedIn ? (
            <>
              <li>
                <Link to="/" className="nav-auth-link">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="nav-auth-link">Signup</Link>
              </li>
            </>
          ) : (
            <li>
              <button className="nav-auth-link" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="landing-hero" id="home" ref={sectionRefs.home}>
        <div className="landing-hero-content center-content">
          <h2>
            <span className="animated-gradient-text">Machine Learning Models and Complex Solutions</span>
          </h2>
          <h1>
            <span className="typewriter">AI and ML Innovations</span>
          </h1>
          <p>We provide SaaS products for your business growth.</p>
          <div className="landing-hero-buttons">
            <a href="#service" className="btn-primary" onClick={e => handleNavClick(e, "service")}>Explore More</a>
            <a href="#playground" className="btn-secondary">Play Ground</a>
          </div>
        </div>
        <div className={`landing-hero-img-wrapper${fade ? " fade-in" : " fade-out"}`}>
          <img
            className="landing-hero-img"
            src={heroImages[heroIndex]}
            alt="AI Illustration"
            key={heroIndex}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="landing-section" id="about" ref={sectionRefs.about}>
        <div className="landing-section-flex">
          <img
            src={sectionImages.about}
            alt="About PURE ML"
            className="section-img"
          />
          <div className="landing-section-content center-content">
            <h3>About Us</h3>
            <h2>About PURE ML And Its Innovative Solutions</h2>
            <p>
              At PURE ML, we harness the power of Machine Learning to deliver innovative software solutions that drive success. We help businesses navigate the digital landscape by providing cutting-edge technology and data-driven insights.
            </p>
            <a href="#service" className="btn-secondary" onClick={e => handleNavClick(e, "service")}>More Details</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="landing-section" id="service" ref={sectionRefs.service}>
        <div className="landing-section-flex">
          <img
            src={sectionImages.service}
            alt="Our Services"
            className="section-img"
          />
          <div className="center-content">
            <h3>Our Services</h3>
            <h2>Services Providing Specifically For Your Goal</h2>
            <div className="landing-services">
              <div className="service-card interactive-card">
                <div className="service-icon">🤖</div>
                <h4>Machine Learning Models</h4>
                <p>Custom ML models tailored to your business needs.</p>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">📊</div>
                <h4>Custom Training</h4>
                <p>Personalized training with your datasets for best outcomes.</p>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">🗂️</div>
                <h4>Model Registry</h4>
                <p>Streamlined management and versioning of your ML models.</p>
              </div>
              <div className="service-card interactive-card">
                <div className="service-icon">📈</div>
                <h4>Data Analytics</h4>
                <p>Transform raw data into actionable insights for growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="landing-section" id="team" ref={sectionRefs.team}>
        <div className="landing-section-flex">
          <img
            src={sectionImages.team}
            alt="Our Team"
            className="section-img"
          />
          <div className="center-content">
            <h3>Our Team</h3>
            <div className="landing-team">
              <div className="team-member interactive-card">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Abhishek" />
                <h4>Abhishek Rastogi</h4>
                <p>CEO & Founder</p>
              </div>
              <div className="team-member interactive-card">
                <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Logesh Kumar" />
                <h4>Logesh Kumar</h4>
                <p>COO & Development</p>
              </div>
              <div className="team-member interactive-card">
                <img src="https://randomuser.me/api/portraits/men/34.jpg" alt="Unknown" />
                <h4>Unknown</h4>
                <p>Undecided</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="landing-section" id="contact" ref={sectionRefs.contact}>
        <div className="landing-section-flex">
          <img
            src={sectionImages.contact}
            alt="Contact Us"
            className="section-img"
          />
          <div className="center-content">
            <h3>Contact</h3>
            <div className="landing-contact">
              <div className="interactive-card">
                <h4>Call Us</h4>
                <p>+91-XXXXXXXXXX</p>
              </div>
              <div className="interactive-card">
                <h4>Email Us</h4>
                <p>contact@PUREML.com</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Footer */}
      <footer className="custom-footer">
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <div className="footer-logo">
              <span>PURE</span><span className="footer-logo-accent">ML</span>
            </div>
            <p>
              At PURE ML, we specialize in harnessing the power of Machine Learning to deliver innovative software solutions that drive success.
            </p>
            <div className="footer-socials">
              <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Short Link</h4>
            <ul>
              <li><a href="#about"><i className="fas fa-angle-right"></i> About us</a></li>
              <li><a href="#contact"><i className="fas fa-angle-right"></i> Contact us</a></li>
              <li><a href="#service"><i className="fas fa-angle-right"></i> Our Services</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Our Projects</a></li>
              <li><a href="#blog"><i className="fas fa-angle-right"></i> Latest Blog</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help Link</h4>
            <ul>
              <li><a href="#"><i className="fas fa-angle-right"></i> Terms Of use</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Privacy Policy</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> Helps</a></li>
              <li><a href="#"><i className="fas fa-angle-right"></i> FAQs</a></li>
              <li><a href="#contact"><i className="fas fa-angle-right"></i> Contact</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact">
              <div>
                <i className="fas fa-phone"></i>
                <span> xxxxxxx</span>
              </div>
              <hr />
              <div>
                <i className="fas fa-envelope"></i>
                <span> quries@PUREML.com</span>
              </div>
              <hr />
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copyright-icon"><i className="far fa-copyright"></i></span>
          <span className="footer-bottom-brand">PURE <span className="footer-logo-accent">ML</span></span>, All right reserved.
        </div>
      </footer>
    </div>
  );
};

export default Landing;