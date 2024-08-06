import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJs,ArcElement,Title,Legend} from "chart.js";

ChartJs.register(
  ArcElement,
  Title,
  Legend
);




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


    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
            position: 'top',
          },
          maintainAspectRatio: true,
          title: {
            display: true,
            text: 'Annual Energy consumption for 2020-21 (in 100 Billion kWh)',
          },
        },
      };

      const data = {
        // chartCountries is used as the labels
        labels: countries,
        datasets: [
          {
            label: 'kWh',
            // chartCount is used as data
            data: counts,
            backgroundColor: [
              '#F1F1F1',
              '#DBAE58',
              '#7E909A',
              '#A5D8DD',
              '#EA6A47',
              '#0091D5',
              '#1C4E80',
            ],
            borderColor: [
              "black",
              "black",
              "black",
              "black",
              "black",
              "black",
              "black",
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    // <div style={{ margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius: "30px", border:"1px solid black" }} className=' p-3 mb-5 bg-white '>
      <Doughnut options={options} data={data} />
    // </div>
  )
}

export default CountriesDoughnut
