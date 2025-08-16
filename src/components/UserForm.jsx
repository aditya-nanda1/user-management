import React from 'react';

export default function UserForm({ form, onChange, onSubmit, editingId, cancelEdit }) {
  return (
    <form onSubmit={onSubmit} className="panel">
      <input name="name" value={form.name} onChange={onChange} placeholder="Name" />
      <input name="email" value={form.email} onChange={onChange} placeholder="Email" />
      <input name="username" value={form.username} onChange={onChange} placeholder="Username" />
      <button type="submit" className="primary">{editingId ? 'Update' : 'Add'}</button>
      {editingId && <button type="button" onClick={cancelEdit}>Cancel</button>}
    </form>
  );
}
