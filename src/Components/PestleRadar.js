import React, { useState } from 'react'
import { useEffect } from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend,
} from 'chart.js';

import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Legend
);

export default function PestleRadar({ pestleFilter, fetchedData }) {

  // States of this Component
  // chartPestles hold the unique pestles depicted in the chart
  // chartIndia hold the associated count of pestles with India
  // chartRussia hold the associated count of pestles with Russia
  // chartChina hold the associated count of pestles with China
  
  const [chartPestle, setChartPestle] = useState([]);
  const [chartIndia, setChartIndia] = useState([]);
  const [chartRussia, setChartRussia] = useState([]);
  const [chartChina, setChartChina] = useState([]);

  // Options to pass to the Doughnut graph
  const options = {
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'GDP composition FY-2022 (in USD 1 Million )',
      },
    },
  };

  // Data to pass to the Doughnut graph
  const data = {
    labels: chartPestle,
    datasets: [
      {
        label: 'India',
        data: chartIndia,
        backgroundColor: '#a5d8dda1',
        borderColor: '#A5D8DD',
        borderWidth: 1,
      },
      {
        label: 'Russia',
        data: chartRussia,
        backgroundColor: '#ea6a4799',
        borderColor: '#EA6A47',
        borderWidth: 1,
      },
      {
        label: 'China',
        data: chartChina,
        backgroundColor: '#1c4e8094',
        borderColor: '#1C4E80',
        borderWidth: 1,
      },
    ],
  };

  // Funciton to desing the graph at the time of rendering
  const makeGraph = () => {

    // Extarcting Pestle varibale from db
    let pestles = [];
    fetchedData.forEach(data => {
      if (data.pestle !== "") pestles.push(data.pestle);
    });

    // Filtering for unique filters
    let uniquePestles = pestles.filter((pestle, i, arr) => {
      return i === arr.indexOf(pestle);
    });
    // Filtering using pestle filter
    if(pestleFilter.length>0){
      uniquePestles= uniquePestles.filter((pestle)=>{
         if(pestleFilter.toLowerCase().includes("ot")) return true;
          return pestle.toLowerCase().includes(pestleFilter.toLowerCase());
      })
    }

    // Unique values of pestles are used to interpret the field of interest for GDP of India, Russia, China
    let countIndia = Array(uniquePestles.length).fill(0);
    let countRussia = Array(uniquePestles.length).fill(0);
    let countChina = Array(uniquePestles.length).fill(0);
    let indexBreak1 = ~~(pestles.length / 3);
    let indexBreak2 = 2 * indexBreak1;


    // Pestles array is broken into 3 parts to separately attain the data for the countries
    for (let i = 0; i < uniquePestles.length; i++) {
      for (let j = 0; j < indexBreak1; j++) {
        if (uniquePestles[i] === pestles[j]) countIndia[i]++;
      }
    }
    for (let i = 0; i < uniquePestles.length; i++) {
      for (let j = indexBreak1; j < indexBreak2; j++) {
        if (uniquePestles[i] === pestles[j]) countRussia[i]++;
      }
    }
    for (let i = 0; i < uniquePestles.length; i++) {
      for (let j = indexBreak2; j < pestles.length; j++) {
        if (uniquePestles[i] === pestles[j]) countChina[i]++;
      }
    }

    // Pestle values with value other than "Economic","Policitcal","Industries","Environmental" are grouped together as "Others"
    let sumIndia = 0, sumRussia = 0, sumChina = 0;
    for (let i = 0; i < uniquePestles.length; i++) {
      if (uniquePestles[i] !== "Economic" && uniquePestles[i] !== "Political" && uniquePestles[i] !== "Industries" && uniquePestles[i] !== "Environmental") {
        sumIndia += countIndia[i];
        countIndia[i] = -1;
        sumRussia += countRussia[i];
        countRussia[i] = -1;
        sumChina += countChina[i];
        countChina[i] = -1;
      }
    }
    uniquePestles = uniquePestles.filter((pestle) => {
      return (pestle === "Economic" || pestle === "Political" || pestle === "Industries" || pestle === "Environmental");
    })
    countIndia = countIndia.filter((count) => {
      return count !== -1;
    })
    countRussia = countRussia.filter((count) => {
      return count !== -1;
    })
    countChina = countChina.filter((count) => {
      return count !== -1;
    })
    uniquePestles.push("Other");
    countIndia.push(sumIndia);
    countRussia.push(sumRussia);
    countChina.push(sumChina);

    // Filtering for Other filter value
    if(pestleFilter.length>0){
      if(pestleFilter.toLowerCase().includes("ot")){
        while(uniquePestles.length>1)uniquePestles.shift();
        while(countChina.length>1)countChina.shift();
        while(countIndia.length>1)countIndia.shift();
        while(countRussia.length>1)countRussia.shift();
      }
      else {
        uniquePestles.pop();
        countChina.pop();
        countIndia.pop();
        countRussia.pop();
      }
    }
    // Setting the states as the updated arrays fetched from db
    setChartPestle(uniquePestles);
    setChartIndia(countIndia);
    setChartRussia(countRussia);
    setChartChina(countChina);
  };

  // The component will re-render evertime filter value is changed
  useEffect(() => {
    makeGraph();
  }, [pestleFilter]);
  return (
    <div style={{margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius:"30px", border:"1px solid black"}} className='p-3 mb-5 bg-white '>
      <Radar options={options} data={data} />
    </div>
  )
}
