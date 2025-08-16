import React, { useEffect, useState } from 'react';
import api from './api';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', username: '' });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [confirm, setConfirm] = useState(null);

  useEffect(() => {
    api.get('/users')
      .then(res => setUsers(res.data))
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.username) {
      setError('All fields required');
      return;
    }
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...form } : u));
      setEditingId(null);
    } else {
      const id = Math.max(0, ...users.map(u => u.id)) + 1;
      setUsers([{ id, ...form }, ...users]);
    }
    setForm({ name: '', email: '', username: '' });
    setError('');
  };

  const startEdit = (user) => {
    setEditingId(user.id);
    setForm({ name: user.name, email: user.email, username: user.username });
  };

  const askDelete = (user) => setConfirm(user);

  const confirmDelete = () => {
    setUsers(users.filter(u => u.id !== confirm.id));
    setConfirm(null);
  };

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <header>
        <h1>User Management Dashboard</h1>
        <span className="badge">React + Axios</span>
      </header>

      <div className="panel">
        <input
          placeholder="Search users..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <UserForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editingId={editingId}
        cancelEdit={() => { setEditingId(null); setForm({ name: '', email: '', username: '' }); }}
      />

      {error && <p className="helper">⚠️ {error}</p>}
      {loading ? <p className="helper">Loading...</p> :
        <UserTable users={filtered} onEdit={startEdit} onDelete={askDelete} />}

      {confirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Delete {confirm.name}?</h3>
            <button onClick={() => setConfirm(null)}>Cancel</button>
            <button className="danger" onClick={confirmDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
}
