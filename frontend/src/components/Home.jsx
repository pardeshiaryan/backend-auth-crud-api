import './Home.css';

export default function Home({ onStartClick }) {
  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-hero">
          <h1>Welcome to NoteApp</h1>
          <p className="hero-subtitle">Your personal note-taking application</p>
          <p className="hero-description">
            Create, manage, and organize your notes with ease. Secure, fast, and simple.
          </p>
          <button className="btn-start" onClick={onStartClick}>
            Get Started
          </button>
        </div>

        <div className="features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Create Notes</h3>
              <p>Quickly create and save your thoughts and ideas</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Secure</h3>
              <p>Your notes are protected with JWT authentication</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✏️</div>
              <h3>Edit & Update</h3>
              <p>Easily edit and update your notes anytime</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗑️</div>
              <h3>Delete</h3>
              <p>Remove notes you no longer need</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏷️</div>
              <h3>Status Tracking</h3>
              <p>Mark notes as pending or done</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>User Accounts</h3>
              <p>Create an account to manage your personal notes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
