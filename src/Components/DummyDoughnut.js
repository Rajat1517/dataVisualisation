import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


// Options to pass to the Doughnut graph
const options = {
  responsive: true,
  plugins: {
    maintainAspectRatio: false,
  },
};

// Dummy data array is used to make the graph
const arr = [1, 2, 4, 8];

// Data to pass to the Doughnut graph
const data = {
  labels: [],
  datasets: [
    {
      data: arr,
      backgroundColor: [
        "#A5D8DD",
        "#EA6A47",
        "#0091D5",
        "#1C4E80",
      ],
      borderColor: [
        "black",
        "black",
        "black",
        "black"
      ],
      borderWidth: 0,
    },
  ],
};


export default function DummyDoughnut() {
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "25vh", borderRadius: "30px" }} className=' p-3 mb-5 bg-white '>
      <Doughnut options={options} data={data} />
    </div>
  )
}