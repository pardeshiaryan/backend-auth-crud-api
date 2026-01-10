import { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { auth } from './services/api';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');

  useEffect(() => {
    const token = auth.getToken();
    const storedUser = auth.getUser();
    if (token && storedUser) {
      setIsAuthenticated(true);
      setUser(storedUser);
      setCurrentPage('profile');
    }
  }, []);

  const handleLoginSuccess = (token, userData) => {
    auth.setToken(token);
    auth.setUser(userData);
    setIsAuthenticated(true);
    setUser(userData);
    setCurrentPage('profile');
  };

  const handleRegisterSuccess = () => {
    setCurrentPage('login');
  };

  const handleLogout = () => {
    auth.logout();
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>Auth App</h1>
        {isAuthenticated && (
          <div className="nav-right">
            <span>Welcome, {user?.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </nav>

      <main className="main-content">
        {isAuthenticated ? (
          <Profile user={user} />
        ) : (
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
              </div>

              {currentPage === 'login' ? (
                <Login onLoginSuccess={handleLoginSuccess} />
              ) : (
                <Register onRegisterSuccess={handleRegisterSuccess} />
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
