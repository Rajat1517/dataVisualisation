import React, { useEffect, useState } from 'react';
import Chart from "react-apexcharts";




function CountriesDoughnut() {

    const [countries,setCountries]= useState([]);
    const [counts,setCounts]= useState([]);


    useEffect(()=>{
        loadCountriesData();
    },[]);

    const loadCountriesData= async ()=>{
        try{
            const res= await fetch("http://localhost:5000/api/get-countries-doughnut");
            const data= await res.json();
            const x= data.map(item=>item.country);
            const y= data.map(item=>item.count);
            setCountries(x);
            setCounts(y);
        }catch(error){
            console.log(error);
        }
    }

    const series= counts;
    const options= {
      chart: {
        width: 380,
        type: 'donut',
      },
      labels: countries,
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        type: 'gradient',
      },
      legend: {
        formatter: function(val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex]
        },
        position: "bottom"
      },
      title: {
        text: 'Annual Energy consumption for 2020-21 (in 100 B kwh)',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 1000
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  

    // const options = {
    //     responsive: true,
    //     plugins: {
    //       legend: {
    //         display: false,
    //         position: 'top',
    //       },
    //       maintainAspectRatio: true,
    //       title: {
    //         display: true,
    //         text: 'Annual Energy consumption for 2020-21 (in 100 Billion kWh)',
    //       },
    //     },
    //   };

    //   const data = {
    //     // chartCountries is used as the labels
    //     labels: countries,
    //     datasets: [
    //       {
    //         label: 'kWh',
    //         // chartCount is used as data
    //         data: counts,
    //         backgroundColor: [
    //           '#F1F1F1',
    //           '#DBAE58',
    //           '#7E909A',
    //           '#A5D8DD',
    //           '#EA6A47',
    //           '#0091D5',
    //           '#1C4E80',
    //         ],
    //         borderColor: [
    //           "black",
    //           "black",
    //           "black",
    //           "black",
    //           "black",
    //           "black",
    //           "black",
    //         ],
    //         borderWidth: 1,
    //       },
    //     ],
    //   };

  return (
    <Chart options={options}  series={series} type='donut' width={470}/>
  )
}

export default CountriesDoughnut
