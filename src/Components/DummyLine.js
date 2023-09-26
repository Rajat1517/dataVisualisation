import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function DummyLine() {

  // Options to pass to the Doughnut graph
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tata Steel Avg Stock Price FY-2021 (in INR)',
    },
  };
  // Dummy data array is used to make the graph
  const arr = [1, 4, 5, 3, 7, 6, 9, 8, 10];

  // Data to pass to the Doughnut graph
  const data = {
    labels: ["", "", "", "", "", "", "", "", ""],
    datasets: [
      {
        label: "",
        data: arr,
        backgroundColor: '#0091d5b9',
        borderColor: '#0091D5',
        borderWidth: 2,
      }
    ],
  };

  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "25vh", borderRadius: "30px" }} className=' p-3 mb-5 bg-white '>
      <Line options={options} data={data} />
    </div>
  )
}
