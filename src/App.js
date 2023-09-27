
// The website is responsive till these minimum dimensions: 725 x 605

import './App.css';
import { useState, useEffect } from 'react';
import StockLine from './Components/StockLine';
import Navbar from "./Components/Navbar"
import Sector from './Components/Sector';
import PestleRadar from './Components/PestleRadar';
import CountryDoughnut from './Components/CountryDoughnut';
import YearBar from './Components/YearBar';
import RegionLine from './Components/RegionLine';
import LikelihoodPie from './Components/LikelihoodPie';
import EnergyTopics from './Components/EnergyTopics';
import Filters from "./Components/Filters"
import Footer from './Components/Footer';
import DummyCarousel from './Components/DummyCarousel';
import Logo from "./logo.png"
import chart from "./chart.png"
import world from "./world.png"

function App() {

  // Defining the states for App.js
  // dataItems will contain the data fetched from db
  // Filters will carry the filter strings
  // Visible controls the visibility of filter options

  const [dataItems, setDataItems] = useState([]);
  const [sectorFilter, setSectorFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [pestleFilter, setPestleFilter] = useState("");
  const [countryFilter, setCountryFilter] = useState("");
  const [endYearFilter, setEndYearFilter] = useState("");
  const [visible, setVisible] = useState("none");

  
  let fetchedData = [];
  // Fetching the data from dataBase
  const loadData = async () => {
    try {
      fetchedData = await fetch("https://datavisualisation.onrender.com//api/getData", {
        method: "POST",
        mode: "cors"
      });
      fetchedData = await fetchedData.json();
      fetchedData = fetchedData[0];
      setDataItems(fetchedData);
    } catch (err) {
      console.log(err);
    }
  }

  // Data will be fetched everytime the App.js is re-rendered
  useEffect(() => {
    loadData();
  }, []);

  return (

    <div className="App">
      <div className="row-container">
        <div id='left-container'>
          <img src={Logo} alt="" width="90%" style={{border: " 2px solid black",borderRadius: "360px", margin: "1px 0"}}/>

          {/* Button to control the visible state */}
          <button id="filter-button" className='filter-inputs' onClick={() => {
            setVisible(visible === "none" ? "block" : "none");
          }}>{visible==="none"? ">": "↓" }  Filters</button>
          {/* Conditional rendering of filters based on visible state */}
          <div style={{ display: `${visible}` }}>
            <Filters
              sectorFilter={sectorFilter} setSectorFilter={setSectorFilter}
              regionFilter={regionFilter} setRegionFilter={setRegionFilter}
              pestleFilter={pestleFilter} setPestleFilter={setPestleFilter}
              countryFilter={countryFilter} setCountryFilter={setCountryFilter}
              endYearFilter={endYearFilter} setEndYearFilter={setEndYearFilter}
            />
          </div>
          {/* Dummy dasboard options (Not working) */}
          <div>
            <hr />
            <div style={{textAlign:"start",margin:"0 0 0 10%"}}>
            <b><p>Apps & Pages</p></b>
            <p>Emails</p>
            <p>Chats</p>
            <p>Calender</p>
            <p>Users</p>
            <p>Pages</p>
            </div>
            <hr/>
          </div>
        </div>

        <div className="" id="right-container">
          <Navbar />
          {/* Using Grid */}
          <div className='row'>
            {/* Images to make UI more attracting */}
            <div className='col-lg-8'>
            <div style={{ margin: "3vh 1vw 1vh 1vw", height: "25vh", borderRadius:"30px", backgroundColor:"#1C4E80" }} id="static-head">
                <img src={world}  style={{ margin:"1vh 0", borderRadius:"30px",border: "2px solid white",width:"40%" }} />
                <img src={chart}  style={{ margin:"1vh 0", borderRadius:"30px",border: "2px solid black",width:"40%" }} />
            </div>
            </div>
            {/* Carousel of Dummy graphs */}
            <div className='col-lg-4'>
              <DummyCarousel/>
            </div>

            {/* Grpahs made with the data values from dataItems */}

            <div className='col-lg-6 graph-elements'>  
              {
                // Stock value interpretes the values of Intensity and Relevance from dataBase
                dataItems.length > 0 ? <StockLine fetchedData={dataItems} /> : <div></div>
              }
            </div>
            <div  className='col-lg-6 graph-elements'>
              {
                // Start Year and End Year from dataBase are used to present the starting and completing year of Government Policies
                dataItems.length > 0 ? <YearBar endYearFilter={endYearFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>

            <div className='col-lg-6 graph-elements'>
              {
                // Count of Countries from dataBase is interpreted for Annual Energy Consumption
                dataItems.length > 0 ? <CountryDoughnut countryFilter={countryFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>
            <div className='col-lg-6 graph-elements'>
              {
                // No. of various topics with sector as "Energy" between the years 2007 and 2020 are shown as stacked bars
                dataItems.length > 0 ? <EnergyTopics fetchedData={dataItems} /> : <div></div>
              }
            </div>
            <div className='col-lg-6 graph-elements'>
              {
                // Average of Likelihood values for respective Pestle Values are shown as Pie Chart
                dataItems.length > 0 ? <LikelihoodPie pestleFilter={pestleFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>
            <div className='col-lg-6 graph-elements'>
              {
                // Count of dataItems with different sectors are shown as Line graph with their respective Regions
                dataItems.length > 0 ? <RegionLine regionFilter={regionFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>
            <div className='col-lg-6 graph-elements'>
              {
                // Sectors count is used to show count of recruits in various sectors in India and Australia
                dataItems.length > 0 ? <Sector sectorFilter={sectorFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>

            <div className='col-lg-6 graph-elements'>
              {
                // Pestle variable is used to define the composition of GDP's of 3 different countries
                dataItems.length > 0 ? <PestleRadar pestleFilter={pestleFilter} fetchedData={dataItems} /> : <div></div>
              }
            </div>
          </div>
          <Footer/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
