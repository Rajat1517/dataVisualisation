import React, { useEffect,useState } from 'react';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, Tooltip, Legend);


function RegionBubbles() {
    const [dataX,setDataX]= useState([]);
    const [intensities,setIntensities]= useState([]);
    const [relevances,setRelevances]= useState([]);
    const [likelihoods,setLikelihoods]= useState([]);

    const loadRegionBubbleData= async ()=>{
        try{
            const res= await fetch("http://localhost:5000/api/get-region-bubbles");
            const data= await res.json();
            const x=[],y1=[],y2=[],y3=[];
            let index=0;
            data.forEach((item) => {
              index++;
              x.push(item.region);
              y1.push({
                x: index,
                y: item.likelihood,
                r: item.likelihood*2,
              });
              y2.push({
                x: index,
                y: item.relevance,
                r: item.relevance*2,
              });
              y3.push({
                x: index,
                y: item.intensity,
                r: item.intensity*2,
              });
            });
            setDataX(x);
            setIntensities(y3);
            setRelevances(y2);
            setLikelihoods(y1);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        loadRegionBubbleData();
    },[])

    const options = {
        responsive: true,
        maintainAspectRatio: false ,
        scales: {
            y: {
              min: 0, // Minimum value for the y-axis
              max: 15, // Maximum value for the y-axis
              ticks:{
                stepSize: 1,
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

    const dataChart = {
    // chartWeeks is used as the labels
    labels: dataX,
    datasets: [
      {
        fill: false,
        label: 'Intensity',
        // chartActual is used as the data for actual line
        data: intensities,
        backgroundColor: '#0091d5b9',
        borderColor: 'yellow',
        borderWidth: 2,
      },
      {
        fill: false,
        label: 'Relevance',
        // chartActual is used as the data for actual line
        data: relevances,
        backgroundColor: 'red',
        borderColor: 'yellow',
        borderWidth: 2,
      },
      {
        fill: false,
        label: 'Likelihood',
        // chartActual is used as the data for actual line
        data: likelihoods,
        backgroundColor: 'green',
        borderColor: 'yellow',
        borderWidth: 2,
      },
    ],
    };
    
  return (
    <Bubble options={options} data={dataChart}/>
  )
}

export default RegionBubbles
