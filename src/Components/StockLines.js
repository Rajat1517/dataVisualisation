import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend
  );

function StockLines() {

    const [intensities,setIntensities]= useState([]);
    const [relevances,setRelevances]= useState([]);


    const loadLineData= async ()=>{
        try{
            const res= await fetch("http://localhost:5000/api/get-stock-line");
            const data= await res.json();
            setIntensities(data.intensityCounts);
            setRelevances(data.relevanceCounts);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        loadLineData();
    },[]);


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
    
      const data = {
        // chartWeeks is used as the labels
        labels: ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],
        datasets: [
          {
            fill: false,
            label: 'Actual',
            // chartActual is used as the data for actual line
            data: intensities,
            backgroundColor: '#0091d5b9',
            borderColor: '#0091D5',
            borderWidth: 2,
          },
          {
            fill: false,
            label: 'Prediction',
            // chartPrediction is used as the data for prediction line
            data: relevances,
            backgroundColor: '#7e909aa7',
            borderColor: '#7E909A',
            borderWidth: 2,
          }
        ],
      };

  return (
    <>
    <Line options={options} data={data} />
    </>
  )
}

export default StockLines
