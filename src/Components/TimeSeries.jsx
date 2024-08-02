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


function TimeSeries() {

    const [dataX,setDataX]= useState([]);
    const [dataY,setDataY]= useState([]);
    const [timeSeries,setTimeSeries]= useState([]);

    const options = {
        responsive: true,
        maintainAspectRatio: false ,
        scales: {
            y: {
              min: 0, // Minimum value for the y-axis
              max: 85, // Maximum value for the y-axis
              ticks:{
                stepSize: 5,
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

  const loadTimeSeries= async ()=>{
    try{
      const res= await fetch("http://localhost:5000/api/getTime-Series");
      const {data}= await res.json();
      setTimeSeries(data);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    loadTimeSeries();
  },[])

  useEffect(()=>{
    let x= timeSeries.map(item=> item.year);
    let y= timeSeries.map(item=> item.count);
    setDataX(x);
    setDataY(y);
  },[timeSeries])

  return (
    <Line options={options} data={data}/>
  )
}

export default TimeSeries
