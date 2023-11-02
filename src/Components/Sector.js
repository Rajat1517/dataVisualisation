
import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    BarElement,
    Title,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    BarElement,
    Title,
    Legend
);

/*
    This component uses sectors and then divide the array into 2 portions. Each portions gives the count of recruits in the respective sectors in India and Australia.
*/

export default function Sector({ sectorFilter,fetchedData }) {

    // States of this Component
    // chartSectors hold the unique sectors depicted in the chart
    // chartIndia hold the associated count with India
    // chartAustralia hold the associated count with Australia
    const [chartSectors, setChartSectors] = useState([]);
    const [chartIndia, setChartIndia] = useState([]);
    const [chartAustralia, setChartAustralia] = useState([]);

    // Function to design the graph at the time of rendering
    const makeGraph = () => {

        // Sector variable from db is extracted
        let sectors = [];
        fetchedData.forEach(data => {
            if (data.sector !== "") sectors.push(data.sector);
        });

        // Unique sectors are used to get the count of all sectors present in the db 
        let uniqueSectors = sectors.filter((sector, i, arr) => {
            return i === arr.indexOf(sector);
        });
        
        // Adding filter for Sector using filterSector
        if(sectorFilter.length>0){
            uniqueSectors = uniqueSectors.filter((sector)=>{
                return sector.toLowerCase().includes(sectorFilter.toLowerCase());
            })
        }
        uniqueSectors = uniqueSectors.filter((sector) => {
            return sector !== "Energy";
        })
        uniqueSectors.sort();

        // Count of sectors is used to interpret the No. of recruits in diff sectors in India and Australia
        // Sectors array is broken into 2 parts to attain the data of the two countries
        let countSectorsIndia = Array(uniqueSectors.length).fill(0);
        let countSectorsAustralia = Array(uniqueSectors.length).fill(0);
        let indexBreak = ~~(sectors.length / 2);
        for (let i = 0; i < uniqueSectors.length; i++) {
            for (let j = 0; j < indexBreak; j++) {
                if (uniqueSectors[i] === sectors[j]) countSectorsIndia[i]++;
            }
        }
        for (let i = 0; i < uniqueSectors.length; i++) {
            for (let j = indexBreak; j < sectors.length; j++) {
                if (uniqueSectors[i] === sectors[j]) countSectorsAustralia[i]++;
            }
        }

        // Setting the states as the updated arrays fetched from db
        setChartSectors(uniqueSectors);
        setChartIndia(countSectorsIndia);
        setChartAustralia(countSectorsAustralia);
    }

    // Options to pass to the graph
    const options = {
        responsive: true,
        maintainAspectRatio: false ,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Graduates of 2019 Joined in various Sectors (in Thousands)',
            },
        },
    };

    // chartSectors are used as labels
    const labels = chartSectors;

    // Data to pass to the graph
    const data = {
        labels,
        datasets: [
            {
                label: 'India',
                data: chartIndia,
                backgroundColor: '#488A99',
                borderColor: "black",
                borderWidth: 1,
            },
            {
                label: 'Australia',
                data: chartAustralia,
                backgroundColor: '#AC3E31',
                borderColor: "black",
                borderWidth: 1,
            },
        ],
    };

    // The component will re-render evertime filter value is changed
    useEffect(() => {
        makeGraph();
    }, [sectorFilter]);

    return (
        <div style={{margin: "3vh 1vw 1vh 1vw", height: "50vh", borderRadius:"30px", border:"1px solid black"}} className=' p-3 mb-5 bg-white '>    
            <Bar options={options} data={data} />
        </div>
    )
}
