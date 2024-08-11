import React, { useEffect, useState } from 'react'
import Chart from "react-apexcharts";

function TimeSeries() {

    const [dataX,setDataX]= useState([]);
    const [dataY,setDataY]= useState([]);
    const [timeSeries,setTimeSeries]= useState([]);

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


  const options= {
    chart:{
      type:"area"
    },
    xaxis: {
      categories: dataX
    },
    stroke:{
      curve: "smooth",
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.9,
        opacityTo: 0.5,
        stops: [0,100],
        colorStops: []
      }
    }
  };
  const series= [
    {
      name: "Gas Accidents",
      data: dataY,
      
    }
  ] 

  useEffect(()=>{
    let x= timeSeries.map(item=> item.year);
    let y= timeSeries.map(item=> item.count);
    setDataX(x);
    setDataY(y);
  },[timeSeries])

  return (
    // <Line options={options} data={data}/>
    <Chart options={options} series={series} type='area'/>
  )
}

export default TimeSeries
