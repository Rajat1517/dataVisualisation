import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";
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


    const options= {
      chart:{
        type:"line"
      },
      xaxis: {
        categories: ["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7"],
      },
      stroke:{
        curve: "smooth",
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          type: "horixontal",
          shadeIntensity: 0.8,
          gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0,100],
          colorStops: []
        }
      }
    };
    const series= [
      {
        name: "Intensities",
        data: intensities,
        
      },
      {
        name: "Relevances",
        data: relevances,
        
      },
    ] 

  return (
    <>
    <Chart options={options} series={series} type='line'/>
    </>
  )
}

export default StockLines
