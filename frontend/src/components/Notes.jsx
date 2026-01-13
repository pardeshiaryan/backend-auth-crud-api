import { useState, useEffect } from 'react';
import { notesApi, auth } from '../services/api';
import './Notes.css';

export default function Notes({ user, onLogout }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    status: 'pending',
  });

  const token = auth.getToken();

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await notesApi.getNotes(token);
      if (response.notes) {
        setNotes(response.notes);
      } else {
        setError(response.message || 'Failed to fetch notes');
      }
    } catch (err) {
      setError('Failed to fetch notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    try {
      let response;
      if (editingId) {
        // Update note
        response = await notesApi.updateNote(
          token,
          editingId,
          formData.title,
          formData.content,
          formData.status
        );
      } else {
        // Create note
        response = await notesApi.createNote(
          token,
          formData.title,
          formData.content,
          formData.status
        );
      }

      if (response.note) {
        await fetchNotes();
        resetForm();
      } else {
        setError(response.message || 'Failed to save note');
      }
    } catch (err) {
      setError('Failed to save note');
      console.error(err);
    }
  };

  const handleEdit = (note) => {
    setFormData({
      title: note.title,
      content: note.content,
      status: note.status,
    });
    setEditingId(note._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const response = await notesApi.deleteNote(token, id);
      if (response.message.includes('successfully')) {
        await fetchNotes();
      } else {
        setError(response.message || 'Failed to delete note');
      }
    } catch (err) {
      setError('Failed to delete note');
      console.error(err);
    }
  };

  const resetForm = () => {
    setFormData({ title: '', content: '', status: 'pending' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <div>
          <h2>My Notes</h2>
          <p>Welcome, {user?.name}</p>
        </div>
        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="notes-actions">
        {!showForm && (
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Add New Note
          </button>
        )}
      </div>

      {showForm && (
        <div className="note-form">
          <h3>{editingId ? 'Edit Note' : 'Create New Note'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter note title"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content:</label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Enter note content"
                rows="5"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status:</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="pending">Pending</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn btn-success">
                {editingId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="notes-list">
        {loading ? (
          <p>Loading notes...</p>
        ) : notes.length === 0 ? (
          <p className="no-notes">No notes yet. Create one to get started!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className={`note-card status-${note.status}`}>
              <div className="note-header">
                <h3>{note.title}</h3>
                <span className={`status-badge status-${note.status}`}>
                  {note.status}
                </span>
              </div>
              <p className="note-content">{note.content}</p>
              <div className="note-meta">
                <small>
                  Created: {new Date(note.createdAt).toLocaleDateString()}
                </small>
              </div>
              <div className="note-actions">
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(note)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
