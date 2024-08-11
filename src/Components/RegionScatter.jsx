import React, { useEffect,useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { memo } from 'react';


function RegionScatter() {
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
              y1.push([
                index,
                item.likelihood,
                10,
              ]);
              y2.push([
                index,
                item.relevance,
                10,
              ]);
              y3.push([
                index,
                item.intensity,
                10,
              ]);
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
      chart: {
        type: 'bubble',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 0.5,
        type: "gradient"
      },
      title: {
        text: 'Region Bubbles',
        align: 'left',
      },
      xaxis: {  
        type: 'category',
      },
      yaxis: {
        max: 18,
      },
      theme: {
        palette: 'palette2',
      },
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
    };
  
    const series = [
      {
        name: 'Inensity',
        data: intensities,
      },
      {
        name: 'Relevance',
        data: relevances,
      },
      {
        name: 'Likelihood',
        data: likelihoods,
      },
    ];
    
  return (
    <>
    <ReactApexChart options={options} series={series} type="bubble" height={350} />
    </>
  )
}

export default memo(RegionScatter);
