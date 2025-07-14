import React from 'react';
import BarChartComponent from '../components/BarChartComponent';

const reportData = [
  { label: 'Water', value: 1000 },
  { label: 'Nutrient1', value: 280 },
  { label: 'Nutrient2', value: 400 },
];

export default function Report() {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Report</h2>
      <BarChartComponent data={reportData} />
    </div>
  );
}