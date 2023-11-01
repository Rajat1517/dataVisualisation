import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement,Title,Legend} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement,Title,Legend);


export default function LikelihoodPie({ pestleFilter, fetchedData }) {

  // States of this Component
  // chartPestles hold the unique pestles depicted in the chart
  // chartRatios hold the associated  average Likelhoods with the pestles
  const [chartPestles, setChartPestles] = useState([]);
  const [chartRatios, setChartRatios] = useState([]);

  // Options to pass to the Doughnut graph
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: ' Avg Accuracy ratios of WION Channel in various Domain News',
      },
    },
  };

  // Data to pass to the Doughnut graph
  const data = {
    // chartPestles are used as the labels
    labels: chartPestles,
    datasets: [
      {
        // chartRatios are used ad the data
        data: chartRatios,
        backgroundColor: [
          '#0091D5',
          '#A5D8DD',
          '#F1F1F1',
          '#1C4E80',
          '#EA6A47',
          '#488A99',
          '#DBAE58',
          '#AC3E31',
          '#7E909A',
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


  // Funciton to desing the graph at the time of rendering
  const makeGraph = () => {

    // Pestles are extracted from the database
    let pestles = [];
    fetchedData.forEach(data => {
      if (data.pestle !== "") pestles.push(data.pestle);
    });

    // Filtering for unique pestles
    let uniquePestles = pestles.filter((pestle, i, arr) => {
      return i === arr.indexOf(pestle);
    });

    // Filtering using pestle filter
    if (pestleFilter.length > 0) {
      uniquePestles = uniquePestles.filter((pestle) => {
        return pestle.toLowerCase().includes(pestleFilter.toLowerCase());
      })
    }

    // Determining the average likelihoods associated with respective pestles
    let countPestles = Array(uniquePestles.length).fill(0);
    let likelihoodRatios = Array(uniquePestles.length).fill(0);
    uniquePestles.forEach((pestle, i) => {
      fetchedData.forEach((data) => {
        if (data.pestle === pestle) {
          if (data.likelihood >= 0) likelihoodRatios[i] += Number(data.likelihood);
          countPestles[i]++;
        }
      })
    })
    likelihoodRatios.forEach((likelihood, i, arr) => {
      arr[i] = ~~(likelihood / countPestles[i]);
    })

    // Setting the states as the updated arrays fetched from db
    setChartRatios(likelihoodRatios);
    setChartPestles(uniquePestles);
  }

// The component will re-render evertime filter value is changed
  useEffect(() => {
    makeGraph();
  }, [pestleFilter])
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", borderRadius: "30px", height: "50vh", border:"1px solid black" }} className=' p-3 mb-5 bg-white'>
      <Pie options={options} data={data} />
    </div>
  )
}
