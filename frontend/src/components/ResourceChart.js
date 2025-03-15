// src/components/Dashboard/ResourceChart.jsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ResourceChart = ({ type, labels, data, backgroundColor, title }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // If we already have a chart, destroy it before creating a new one
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create the new chart
    const ctx = chartRef.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: type || 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: title || 'Resource Usage',
          data: data,
          backgroundColor: backgroundColor || [
            'rgba(54, 162, 235, 0.5)', // Blue
            'rgba(75, 192, 192, 0.5)', // Green
            'rgba(255, 206, 86, 0.5)', // Yellow
          ],
          borderColor: backgroundColor?.map(color => color.replace('0.5', '1')) || [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: type === 'pie' ? undefined : {
          y: {
            beginAtZero: true,
            max: 100
          }
        },
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });

    // Cleanup function
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, labels, data, backgroundColor, title]);

  return (
    <div style={{ height: '300px' }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ResourceChart;