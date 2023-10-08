import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

export default function RegionLine({ regionFilter, fetchedData }) {

  // States of this Component
  // chartRegions hold the unique regions depicted in the chart
  // chartEnergy hold the associated count with the Energy
  // chartFinancialService hold the associated count with the FinancialService
  // chartManufactoring hold the associated count with the Manufactoring
  // chartOthers hold the associated count with the Others 
  const [chartEnergy, setChartEnergy] = useState([]);
  const [chartManufactoring, setChartManufactoring] = useState([]);
  const [chartFinancialService, setChartFinancialService] = useState([]);
  const [chartRegions, setChartRegions] = useState([]);
  const [chartOthers, setChartOthers] = useState([]);

  // Options to pass to the Doughnut graph
  const options = {
    responsive: true,
    maintainAspectRatio: false ,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Events affecting different regions (2017-2020)',
      },
    },
  };

  // Data to pass to the Doughnut graph
  const data = {
    // chartRegions is used as the labels
    labels: chartRegions,
    datasets: [
      {
        label: 'Energy',
        // chartEnergy is used as data
        data: chartEnergy,
        backgroundColor: '#1C4E80',
        borderColor: ' #1C4E80',
        borderWidth: 3,
      },
      {
        label: 'Manufactoring',
        // chartManufactoring is used as data
        data: chartManufactoring,
        backgroundColor: '#488A99',
        borderColor: '#488A99',
        borderWidth: 3,
      },
      {
        label: 'Financial Services',
        // chartFinancialService is used as data
        data: chartFinancialService,
        backgroundColor: '#DBAE58',
        borderColor: '#DBAE58',
        borderWidth: 3,
      },
      {
        label: 'Other Sectors',
        // chartOthers is used as data
        data: chartOthers,
        backgroundColor: '#AC3E31',
        borderColor: '#AC3E31',
        borderWidth: 3,
      }
    ],
  };

  // Funciton to desing the graph at the time of rendering
  const makeGraph = () => {
    // Regions are extracted from the database
    let regions = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].region !== "") regions.push(fetchedData[i].region);
    }

    // Filtering uique regions
    let uniqueRegions = regions.filter((region, i, arr) => {
      return i === arr.indexOf(region);
    });

    uniqueRegions.sort();
    // Filtering regions using filter
    if (regionFilter.length > 0) {
      uniqueRegions = uniqueRegions.filter((region) => {
        if (regionFilter.toLowerCase().includes("other")){
          return true;
        } 
        return region.toLowerCase().includes(regionFilter.toLowerCase());
      })
    }

    //  Unique regions are used to get their individual count in the data
    let countEnergy = Array(uniqueRegions.length).fill(0);
    let countManufactoring = Array(uniqueRegions.length).fill(0);
    let countFinancialService = Array(uniqueRegions.length).fill(0);
    let countOthers = Array(uniqueRegions.length).fill(0);

    let countRegions = Array(uniqueRegions.length).fill(0);

    uniqueRegions.forEach((region, i) => {
      for (let j = 0; j < fetchedData.length; j++) {
        if (fetchedData[j].region == region) {
          if (fetchedData[j].sector === "Energy") countEnergy[i]++;
          else if (fetchedData[j].sector === "Manufacturing") countManufactoring[i]++;
          else if (fetchedData[j].sector === "Financial services") countFinancialService[i]++;
          else countOthers[i]++;
        }
      }
      for (let j = 0; j < regions.length; j++) {
        if (region === regions[j]) countRegions[i]++;
      }
    })

    // Regions with count less than or equal to 30 are grouped together as "Others"
    let sumEnergy = 0;
    countEnergy = countEnergy.filter((count, i) => {
      if (countRegions[i] <= 30) {
        sumEnergy += count;
        return false;
      }
      return true;
    })
    let sumManufactoring = 0;
    countManufactoring = countManufactoring.filter((count, i) => {
      if (countRegions[i] <= 30) {
        sumManufactoring += count;
        return false;
      }
      return true;
    })
    let sumFinancialServices = 0;
    countFinancialService = countFinancialService.filter((count, i) => {
      if (countRegions[i] <= 30) {
        sumFinancialServices += count;
        return false;
      }
      return true;
    })
    let sumOthers = 0;
    countOthers = countOthers.filter((count, i) => {
      if (countRegions[i] <= 30) {
        sumOthers += count;
        return false;
      }
      return true;
    })


    uniqueRegions = uniqueRegions.filter((count, i) => {
      return countRegions[i] > 30;
    })

    uniqueRegions.push("Others Regions");
    countEnergy.push(sumEnergy);
    countFinancialService.push(sumFinancialServices);
    countManufactoring.push(sumManufactoring);
    countOthers.push(sumOthers);

    // Filtering regions for other filter
    if (regionFilter.length > 0) {
      if(regionFilter.toLowerCase().includes("ot")){
        while(uniqueRegions.length>1)uniqueRegions.shift();
        while(countEnergy.length>1)countEnergy.shift();
        while(countFinancialService.length>1)countFinancialService.shift();
        while(countManufactoring.length>1)countManufactoring.shift();
        while(countOthers.length>1)countOthers.shift();
      }
      else {
        uniqueRegions.pop();
        countEnergy.pop();
        countFinancialService.pop();
        countManufactoring.pop();
        countOthers.pop();
      }
    }

    // Setting the states as the updated arrays fetched from db
    setChartEnergy(countEnergy);
    setChartManufactoring(countManufactoring);
    setChartFinancialService(countFinancialService);
    setChartOthers(countOthers);
    setChartRegions(uniqueRegions);

  }
  // The component will re-render evertime filter value is changed
  useEffect(() => {
    makeGraph();
  }, [regionFilter])
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius:"30px", border:"1px solid black" }} className=' p-3 mb-5 bg-white'>
      <Line options={options} data={data} />
    </div>
  )
}
