import React from 'react'
import { PolarArea } from 'react-chartjs-2';

// Data to pass to the Doughnut graph
const data = {
  labels: ['', ''],
  datasets: [
    {
      
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
