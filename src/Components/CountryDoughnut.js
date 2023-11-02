import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart as ChartJs,Title,Legend} from "chart.js";

ChartJs.register(
  Title,
  Legend
);

/*
  The component uses countries and their individual counts to project the energy consumption in the country, countries with count <15 are clubbed together as others.
*/

export default function CountryDoughnut({ countryFilter, fetchedData }) {

  // States of this Component
  // chartCountries hold the unique contries depicted in the chart
  // chartCounts hold the associated count with the countries showing the energy consumption
  const [chartCountries, setChartCountries] = useState([]);
  const [chartCounts, setChartCounts] = useState([]);

  // Options to pass to the Doughnut graph
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      maintainAspectRatio: false,
      title: {
        display: true,
        text: 'Annual Energy consumption for 2020-21 (in 100 Billion kWh)',
      },
    },
  };

  // Data to pass to the Doughnut graph
  const data = {
    // chartCountries is used as the labels
    labels: chartCountries,
    datasets: [
      {
        label: 'kWh',
        // chartCount is used as data
        data: chartCounts,
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

  // Funciton to desing the graph at the time of rendering
  const makeGraph = () => {

    // Countries are extracted from the database
    let countries = [];
    for (let i = 0; i < fetchedData.length; i++) {
      if (fetchedData[i].country !== "") countries.push(fetchedData[i].country);
    }
    let uniqeCountries = countries.filter((country, i, arr) => {
      return i === arr.indexOf(country);
    });
    uniqeCountries.reverse();

    // Using the country filter
    if (countryFilter.length > 0) {
      uniqeCountries = uniqeCountries.filter((country) => {
        if (countryFilter.toLowerCase().includes("ot")) return true;
        return country.toLowerCase().includes(countryFilter.toLowerCase());
      })
    }

    //  Unique countries are used to get their individual count in the data
    let countCountries = Array(uniqeCountries.length).fill(0);
    for (let i = 0; i < uniqeCountries.length; i++) {
      for (let j = 0; j < countries.length; j++) {
        if (uniqeCountries[i] === countries[j]) countCountries[i]++;
      }
    }
    // Countries with count lesser than or equal to 15 are grouped together as "Others"
    let countOthers = 0;
    uniqeCountries = uniqeCountries.filter((country, i) => {
      return countCountries[i] > 15;
    });
    countCountries.forEach((country) => {
      if (country <= 15) {
        countOthers += country;
      }
    })
    countCountries = countCountries.filter((country) => {
      return country > 15;
    })

    uniqeCountries.push("Others");
    countCountries.push(countOthers);
    // Filtering countries for Other filter
    if (countryFilter.length > 0) {
      if (countryFilter.toLowerCase().includes("ot")) {
        while (uniqeCountries.length > 1) uniqeCountries.shift();
        while (countCountries.length > 1) countCountries.shift();
      }
      else {
        uniqeCountries.pop();
        countCountries.pop();
      }
    }
    // Setting the states as the updated arrays fetched from db
    setChartCountries(uniqeCountries);
    setChartCounts(countCountries);
  }
  // The component will re-render evertime filter value is changed
  useEffect(() => {
    makeGraph();
  }, [countryFilter])
  return (
    <div style={{ margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius: "30px", border:"1px solid black" }} className=' p-3 mb-5 bg-white '>
      <Doughnut options={options} data={data} />
    </div>
  )
}
