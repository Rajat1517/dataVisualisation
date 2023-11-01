import React from 'react'
import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  LineElement,
  Title,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  Title,
  Legend
);


export default function StockLine({ fetchedData }) {

  // States of this Component
  // chartWeeks hold the unique weeks depicted in the chart
  // chartActual hold the associated count of Intensities
  // chartPrediction hold the associated count of Relevance
  const [chartActual, setChartActual] = useState([]);
  const [chartWeeks, setChartWeeks] = useState([]);
  const [chartPrediction, setChartPrediction] = useState([]);

  // Options to pass to the graph
  const options = {
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tata Steel Avg Stock Price FY-2021 (in INR)',
      },
    },
  };

  // Data to pass to the graph
  const data = {
    // chartWeeks is used as the labels
    labels: chartWeeks,
    datasets: [
      {
        fill: true,
        label: 'Actual',
        // chartActual is used as the data for actual line
        data: chartActual,
        backgroundColor: '#0091d5b9',
        borderColor: '#0091D5',
        borderWidth: 2,
      },
      {
        fill: true,
        label: 'Prediction',
        // chartPrediction is used as the data for prediction line
        data: chartPrediction,
        backgroundColor: '#7e909aa7',
        borderColor: '#7E909A',
        borderWidth: 2,
      }
    ],
  };

  // Functions to design the graph at the time of render
  const makeGraph = () => {

    // Intensity variable from db is used as data of  Actual Line
    let intensities = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].intensity !== "") intensities.push(fetchedData[i].intensity);
    }
    let uniqueIntensities = intensities.filter((intensity, i, arr) => {
      return i === arr.indexOf(intensity);
    })
    // uniqueIntensities are used to make week number labels
    uniqueIntensities.sort((a, b) => a - b);
    let countIntensities = [];
    for (let i = 0; i < uniqueIntensities.length; i++) {
      countIntensities.push(0);
    }
    for (let i = 0; i < uniqueIntensities.length; i++) {
      for (let j = 0; j < intensities.length; j++) {
        if (uniqueIntensities[i] === intensities[j]) countIntensities[i]++;
      }
    }
    for (let i = 0; i < uniqueIntensities.length; i++) {
      uniqueIntensities[i] = "Week " + (uniqueIntensities[i]);
    }

    // slice is used to make 7 entries in chart data, to equalise the size of uniqueIntensities and uniqueRelevances
    uniqueIntensities = uniqueIntensities.slice(0, 7);
    countIntensities = countIntensities.slice(0, 7);


    // Relevance variable from db is used as data of  Prediction Line
    let relevance = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].relevance !== "")
        relevance.push(fetchedData[i].relevance);
    }
    let uniqueRelevance = relevance.filter((data, i, arr) => {
      return i === arr.indexOf(data);
    });
    let countRelevance = [];
    for (let i = 0; i < uniqueRelevance.length; i++) {
      countRelevance.push(0);
    }
    for (let i = 0; i < uniqueRelevance.length; i++) {
      for (let j = 0; j < relevance.length; j++) {
        if (uniqueRelevance[i] === relevance[j]) countRelevance[i]++;
      }
    }
    // Setting the states as the updated arrays fetched from db
    setChartActual(countIntensities);
    setChartWeeks(uniqueIntensities);
    setChartPrediction(countRelevance);
  }

  useEffect(() => {
    makeGraph();
  }, []);

  return (
    <div style={{margin: "3vh 1vw 1vh 1vw", height: "50vh",borderRadius:"30px", border:"1px solid black"}} className=' p-3 mb-5 bg-white '>
      <Line options={options} data={data} />
    </div>
  )

}


