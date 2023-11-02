import React, { useEffect, useState } from 'react'
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

/*
  This component uses years and topics with sector as Energy. It takes up the count of all topics in the selected years and club the topics with count <=70 as others. 
*/

export default function EnergyTopics({ fetchedData }) {

  // States of this Component
  // chartYears hold the unique years depicted in the chart
  // chartTopics hold the 3 topics that are shown in the chart
  // chartTopic1 hold the associated count of topic 1
  // chartTopic2 hold the associated count of topic 2
  // chartTopic3 hold the associated count of topic 3 
  const [chartYears,setChartYears] = useState([]);
  const [chartTopics,setChartTopics]= useState([]);
  const [chartTopic1,setChartTopic1] = useState([]);
  const [chartTopic2,setChartTopic2] = useState([]);
  const [chartTopic3,setChartTopic3] = useState([]);

  // Options to pass to the Doughnut graph
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Energy Crisis Updates (2007-2020)',
      },
    },
    maintainAspectRatio: false ,
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  // Data to pass to the Doughnut graph
  const data = {
    // chartYears is used as labels
    labels: chartYears,
    datasets: [
      {
        // Topic1
        label: chartTopics[0],
        // chartTopic1 is used as the data
        data: chartTopic1,
        backgroundColor: '#488A99',
        borderColor: "black",
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        // Topic2
        label: chartTopics[1],
         // chartTopic2 is used as the data
        data: chartTopic2,
        backgroundColor: ' #F1F1F1',
        borderColor: "black",
        borderWidth: 1,
        stack: 'Stack 0',
      },
      {
        // Topic3
        label: chartTopics[2],
         // chartTopic3 is used as the data
        data: chartTopic3,
        backgroundColor: '#AC3E31',
        borderColor: "black",
        borderWidth: 1,
        stack: 'Stack 0',
      },
    ],
  };

  const makeGraph = () => {

    // Years with sector as "Energy" are extracted from the database
    let years = [];
    fetchedData.forEach(data => {
      if (data.published !== "" && data.sector === "Energy") {
        years.push(data.published.slice(-13, -9));
      }
    });
    // Filtering for unique years
    let uniqueYears = years.filter((year, i, arr) => {
      return i === arr.indexOf(year);
    });
    uniqueYears.sort();

    // Extracting topics from the database with sector as "Energy"
    let topics = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].topic !== "" && fetchedData[i].sector === "Energy") topics.push(fetchedData[i].topic);
    }
    // Filtering for unique topics
    let uniqueTopics = topics.filter((topic, i, arr) => {
      return i === arr.indexOf(topic);
    });

    // Count of different topics
    let countTopics = Array(uniqueTopics.length).fill(0);
    for (let i = 0; i < uniqueTopics.length; i++) {
      for (let j = 0; j < topics.length; j++) {
        if (uniqueTopics[i] === topics[j]) countTopics[i]++;
      }
    }

    // Grouping topics with count less than or equal to 70 as "Others"
    let sumOtherTopics = 0;
    uniqueTopics = uniqueTopics.filter((topic, i) => {
      if (countTopics[i] <= 70) {
        sumOtherTopics += countTopics[i];
        return false;
      }
      return true;
    })
    uniqueTopics.push("Others");

    // Dividing the data in 3 portions
    let countTopic1 = Array(uniqueYears.length).fill(0);
    let countTopic2 = Array(uniqueYears.length).fill(0);
    let countTopic3 = Array(uniqueYears.length).fill(0);

    uniqueYears.forEach((year, i) => {
      for (let k = 0; k < fetchedData.length; k++) {
        if (fetchedData[k].topic === uniqueTopics[0] && year === fetchedData[k].published.slice(-13, - 9)) {
          countTopic1[i]++;
        }
      }
    })
    uniqueYears.forEach((year, i) => {
      for (let k = 0; k < fetchedData.length; k++) {
        if (fetchedData[k].topic === uniqueTopics[1] && year === fetchedData[k].published.slice(-13, - 9)) {
          countTopic2[i]++;
        }
      }
    })
    uniqueYears.forEach((year, i) => {
      for (let k = 0; k < fetchedData.length; k++) {
        if (fetchedData[k].topic !== uniqueTopics[1] && fetchedData[k].topic !== uniqueTopics[0] && year === fetchedData[k].published.slice(-13, - 9)) {
          countTopic3[i]++;
        }
      }
    })

    // Setting the states as the updated arrays fetched from db
    setChartTopic1(countTopic1);
    setChartTopic2(countTopic2);
    setChartTopic3(countTopic3);
    setChartTopics(uniqueTopics);
    setChartYears(uniqueYears);
  }
  
  useEffect(() => {
    makeGraph();
  }, []);

  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius:"30px", border:"1px solid black"}} className=' p-3 mb-5 bg-white  bg-dark'>
    <Bar 
   options={options} data={data} />
  </div>
  )
}
