import { useState, useEffect } from 'react';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Notes from './components/Notes';
import { auth } from './services/api';
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  useEffect(() => {
    const token = auth.getToken();
    const storedUser = auth.getUser();
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setCurrentPage('notes');

    }
  }, []);

  const handleLoginSuccess = (token, userData) => {
    auth.setToken(token);
    auth.setUser(userData);
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('notes');
  
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
  };

  const handleStartClick = () => {
    setCurrentPage('login');
  };

  return (
    <div className="app">
      {isAuthenticated && (
        <nav className="navbar">
          <h1>NoteApp</h1>
          <div className="nav-right">
            <span>Welcome, {user?.name}</span>
          </div>
        </nav>
      )}

      <main className="main-content">
        {currentPage === 'home' && (
          <Home onStartClick={handleStartClick} />
        )}

        {currentPage === 'login' && (
          <>
            <div className="auth-container">
              <div className="auth-tabs">
                <button
                  className={`tab ${currentPage === 'login' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('login')}
                >
                  Login
                </button>
                <button
                  className={`tab ${currentPage === 'register' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('register')}
                >
                  Register
                </button>
                <button
                  className="tab"
                  onClick={() => setCurrentPage('home')}
                >
                  Back
                </button>
              </div>

              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </>
        )}

        {currentPage === 'register' && (
          <>
            <div className="auth-container">
              <div className="auth-tabs">
                <button
                  className={`tab ${currentPage === 'login' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('login')}
                >
                  Login
                </button>
                <button
                  className={`tab ${currentPage === 'register' ? 'active' : ''}`}
                  onClick={() => setCurrentPage('register')}
                >
                  Register
                </button>
                <button
                  className="tab"
                  onClick={() => setCurrentPage('home')}
                >
                  Back
                </button>
              </div>

              <Register onRegisterSuccess={handleRegisterSuccess} />
            </div>
          </>
        )}

        {currentPage === 'notes' && isAuthenticated && (
          <Notes user={user} onLogout={handleLogout} />
        )}
      </main>
    </div>
  );
}

export default App;
