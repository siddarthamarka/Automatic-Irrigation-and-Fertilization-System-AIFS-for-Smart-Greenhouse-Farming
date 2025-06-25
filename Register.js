import React, { useState } from 'react';
export default function Register() {
  const [form, setForm] = useState({ name: '', mobile: '', password: '' });
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(form));
    window.location.href = '/home';
  };
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input className="border p-2 mb-2 w-full" placeholder="Full Name" name="name" onChange={handleChange} required />
      <input className="border p-2 mb-2 w-full" placeholder="Mobile Number" name="mobile" onChange={handleChange} required />
      <input type="password" className="border p-2 mb-2 w-full" placeholder="Password" name="password" onChange={handleChange} required />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}