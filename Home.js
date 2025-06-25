import React from 'react';
import BarChartComponent from '../components/BarChartComponent';

const sampleData = [
  { label: 'Water', value: 1200 },
  { label: 'Nutrient1', value: 300 },
  { label: 'Nutrient2', value: 450 },
];

function downloadCSV() {
  const rows = [
    ['Label', 'Quantity (ml)'],
    ...sampleData.map(item => [item.label, item.value])
  ];
  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(",")).join("");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "nutrient_water_report.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function Home() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Usage Analytics</h2>
      <BarChartComponent data={sampleData} />
      <button onClick={downloadCSV} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">Download Report (CSV)</button>
    </div>
  );
}