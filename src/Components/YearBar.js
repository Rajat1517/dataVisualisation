import React, { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
);

/*
    This component uses start year and end years. It creates a universal array of all the years involved, then show the count of years as start year or end year in the graph.
*/

export default function YearBar({endYearFilter, fetchedData }) {

  // States of this Component
  // chartYears hold the unique years depicted in the chart
  // chartCounts hold the associated count with the countries showing the energy consumption
  const [chartYears, setChartYears] = useState([]);
  const [chartStartYears, setChartStartYears] = useState([]);
  const [chartEndYears, setChartEndYears] = useState([]);

  // Options to be passed to the graph
  const options = {
    elements: {
      bar: {
        fill: true,
        borderWidth: 1,
      },
    },
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Polices of Indian Government',
      },
    },
  };
  
  // Data to be passed to the graph
  const data = {
    // chartYears is used as the labels
    labels: chartYears,
    datasets: [
      {
        label: "Start Year",
        // chartStartYears is used as the data for startinig years
        data: chartStartYears,
        borderColor: 'black',
        backgroundColor: '#1C4E80',
      },
      {
        label: 'End Year',
        // chartEndYears is used as the data for ending years
        data: chartEndYears,
        borderColor: 'black',
        backgroundColor: '#0091D5',
      },
    ],
  };

  // Function to design the grapg at the of rendering
  const makeGraph = () => {

    // start_years are used as starting years of Policies
    let startYears = [];

     // end_years are used as completing years of Policies
    let endYears = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].start_year !== "") startYears.push(fetchedData[i].start_year);
      if (fetchedData[i].end_year !== "") endYears.push(fetchedData[i].end_year);
    }

    let uniqueStartYears = startYears.filter((start_year, i, arr) => {
      return i === arr.indexOf(start_year);
    });
    let uniqueEndYears = endYears.filter((end_year, i, arr) => {
      return i === arr.indexOf(end_year);
    });

    // Unique start years are used to get their counts in the data
    let countStartYears = Array(uniqueStartYears.length).fill(0);
    for (let i = 0; i < uniqueStartYears.length; i++) {
      for (let j = 0; j < startYears.length; j++) {
        if (uniqueStartYears[i] === startYears[j]) countStartYears[i]++;
      }
    }

     // Unique end years are used to get their counts in the data
    let countEndYears = Array(uniqueEndYears.length).fill(0);
    for (let i = 0; i < uniqueEndYears.length; i++) {
      for (let j = 0; j < endYears.length; j++) {
        if (uniqueEndYears[i] === endYears[j]) countEndYears[i]++;
      }
    }
    
    // All the unique years in out of end_years and start_years are merged together and filtered for duplicates
    let uniqueYears = uniqueStartYears.concat(uniqueEndYears);
    uniqueYears = uniqueYears.filter((year, i, arr) => {
      return i === arr.indexOf(year) && year<=2060;
    })
    
    // Final counts of start_years and end_years are collected, for the possibility that some of the start or end years are not common
    uniqueYears.sort((a,b)=>a-b);
    console.log(uniqueEndYears);
    let finalCountEndYears = Array(uniqueYears.length).fill(0);
    let finalCountStartYears = Array(uniqueYears.length).fill(0);
    uniqueYears.forEach((year, j) => {
      for (let i = 0; i < uniqueStartYears.length; i++) {
        if (uniqueStartYears[i] === year) {
          finalCountStartYears[j] += countStartYears[i];
        }
      }
    })
    
    uniqueYears.forEach((year, j) => {
      for (let i = 0; i < uniqueEndYears.length; i++) {
        if (uniqueEndYears[i] === year) {
          finalCountEndYears[j] += countEndYears[i];
        }
      }
    })
    
    // Filtering end years using filter
    if(endYearFilter.length>0){
      uniqueYears.forEach((year,i)=>{
        if(!(year.toString().includes(endYearFilter))){
          finalCountEndYears[i]=0;
        }
      })
    }
    // Setting the states as the updated arrays fetched from db
    setChartEndYears(finalCountEndYears);
    setChartYears(uniqueYears);
    setChartStartYears(finalCountStartYears);
  }

  // The component will re-render evertime filter value is changed
  useEffect(() => {
    makeGraph();
  }, [endYearFilter]);
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius:"30px", border:"1px solid black" }} className=' p-3 mb-5 bg-white '>
      <Bar options={options} data={data} />
    </div>
  )
}
