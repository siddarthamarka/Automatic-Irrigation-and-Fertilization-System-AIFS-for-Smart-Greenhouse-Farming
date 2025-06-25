import React from 'react';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Mobile:</strong> {user.mobile}</p>
      <button onClick={handleLogout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </div>
  );
}