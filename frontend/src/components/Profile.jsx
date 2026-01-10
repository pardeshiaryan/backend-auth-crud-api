import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { auth } from '../services/api';

export default function Profile({ user }) {
  const [profileData, setProfileData] = useState(user);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = auth.getToken();
        const response = await api.getProfile(token);
        setProfileData(response);
      } catch (err) {
        setError('Failed to load profile');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="profile">Loading...</div>;
  }

  return (
    <div className="profile">
      <h2>Profile</h2>
      {error && <div className="error-message">{error}</div>}
      {profileData && (
        <div className="profile-info">
          <p>
            <strong>Name:</strong> {profileData.name}
          </p>
          <p>
            <strong>Email:</strong> {profileData.email}
          </p>
          <p>
            <strong>ID:</strong> {profileData._id || profileData.id}
          </p>
        </div>
      )}
    </div>
  );
}
