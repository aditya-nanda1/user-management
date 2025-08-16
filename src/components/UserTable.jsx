import React from 'react';

export default function UserTable({ users, onEdit, onDelete }) {
  if (!users.length) return <p className="helper">No users found</p>;

  return (
    <div className="panel">
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.username}</td>
              <td>
                <button onClick={() => onEdit(u)}>Edit</button>
                <button className="danger" onClick={() => onDelete(u)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
