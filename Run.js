import React, { useState } from 'react';

export default function Run() {
  const [inputs, setInputs] = useState({ water: '', nutrient1: '', nutrient2: '' });
  const handleChange = e => setInputs({ ...inputs, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    alert(JSON.stringify(inputs));
  };
  return (
    <form onSubmit={handleSubmit} className="p-4">
      <h2 className="text-lg font-bold mb-4">Select Quantities</h2>
      <input name="water" type="number" placeholder="Water (ml)" className="border p-2 mb-2 w-full" onChange={handleChange} required />
      <input name="nutrient1" type="number" placeholder="Nutrient 1 (ml)" className="border p-2 mb-2 w-full" onChange={handleChange} required />
      <input name="nutrient2" type="number" placeholder="Nutrient 2 (ml)" className="border p-2 mb-2 w-full" onChange={handleChange} required />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Apply</button>
    </form>
  );
}