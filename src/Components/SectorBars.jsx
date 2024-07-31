import React, { useEffect, useState } from 'react';
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
    Legend
  );
  

function SectorBars() {

    const [sectorData,setSectorData]= useState(null);
    const [dataX,setDataX]= useState([]);
    const [dataY,setDataY]= useState([]);

    const loadSectorData= async ()=>{
        try{
            const res= await fetch("http://localhost:5000/api/getSector-Bars");
            const {data}= await res.json();
            setSectorData(data);
            const x= data.map(item=>item.sector);
            const y= data.map(item=>item.count);
            setDataX(x);
            setDataY(y);
        }catch(error){
            console.log("Sector API error: ",error);
        }
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false ,
        scales: {
            y: {
            //   min: 0, // Minimum value for the y-axis
              max: 550, // Maximum value for the y-axis
              ticks:{
                stepSize: 10,
              }
            }
          },
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          title: {
            display: true,
            text: 'Amount of Gas Accidents',
          },
        },
      };

    const data = {
    // chartWeeks is used as the labels
    labels: dataX,
    datasets: [
      {
        fill: false,
        label: 'Frequency',
        // chartActual is used as the data for actual line
        data: dataY,
        backgroundColor: '#0091d5b9',
        borderColor: '#0091D5',
        borderWidth: 2,
      },
    ],
  };

    useEffect(()=>{
        loadSectorData();
    },[])

  return (
      <Bar options={options} data={data} />
  )
}

export default SectorBars
