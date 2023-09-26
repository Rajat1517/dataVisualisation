import React from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// Data to pass to the Doughnut graph
const data = {
  labels: ['', ''],
  datasets: [
    {
      label: '# of Votes',
      // Dummy data array is used for the graph
      data: [12, 19],
      backgroundColor: [
        "#EA6A47",
        "#A5D8DD",
      ],
      borderWidth: 1,
    },
  ],
};

export default function DummyPolar() {
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "25vh", borderRadius: "30px" }} className=' p-3 mb-5 bg-white '>
      <PolarArea data={data} />
    </div>
  )
}
