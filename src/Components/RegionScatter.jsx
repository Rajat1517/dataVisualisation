import React, { useEffect,useState } from 'react';
import Plot from 'react-plotly.js';


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
              y1.push({
                x: index,
                y: item.likelihood,
                z: 1,
              });
              y2.push({
                x: index,
                y: item.relevance,
                z: 2,
              });
              y3.push({
                x: index,
                y: item.intensity,
                z: 3,
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

    const data = [
        {
          x: intensities.map(intensity=> intensity.x),
          y: intensities.map(intensity=> intensity.y),
          z: intensities.map(intensity=> intensity.z),
          mode: 'markers',
          marker: {
            size: 12,
            line: {
              color: 'rgba(217, 217, 217, 0.14)',
              width: 0.5
            },
            opacity: 1
          },
          type: 'scatter3d'
        },
        {
            x: relevances.map(intensity=> intensity.x),
            y: relevances.map(intensity=> intensity.y),
            z: relevances.map(intensity=> intensity.z),
            mode: 'markers',
            marker: {
              size: 12,
              line: {
                color: 'green',
                width: 0.5
              },
              opacity: 1
            },
            type: 'scatter3d'
          },
          {
            x: likelihoods.map(intensity=> intensity.x),
            y: likelihoods.map(intensity=> intensity.y),
            z: likelihoods.map(intensity=> intensity.z),
            mode: 'markers',
            marker: {
              size: 12,
              line: {
                color: 'rgba(217, 217, 217, 0.14)',
                width: 0.5
              },
              opacity: 1
            },
            type: 'scatter3d'
          },
            
      ];
    
      const layout = {
        title: '3D Scatter Plot',
        autosize: true,
        scene: {
          xaxis: { title: 'X Axis' },
          yaxis: { title: 'Y Axis' },
          zaxis: { title: 'Z Axis' }
        }
      };

    useEffect(()=>{
        loadRegionBubbleData();
    },[])

    
  return (
    <>
    <Plot layout={layout} data={data} style={{
        height: "100%",
        width: "100%"
    }}/>
    </>
  )
}

export default RegionScatter;
