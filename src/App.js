
// The website is responsive till these minimum dimensions: 725 x 605

import './App.css';
import { useState, useEffect } from 'react';
import StockLine from './Components/StockLine';
import Navbar from "./Components/Navbar";
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
import TimeSeries from './Components/TimeSeries';
import SectorBars from './Components/SectorBars';
import RegionBubbles from './Components/RegionBubbles';
import RegionScatter from './Components/RegionScatter';

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
  const [fetching, setFetching]= useState(true);
  
  //https://datavisualisation-va1q.onrender.com/api/getData  http://localhost:5000/api/getData
  // https://datavisualisation.onrender.com
  let fetchedData = [];
  // Fetching the data from dataBase
  const loadData = async () => {
    try {
      fetchedData = await fetch("https://datavisualisation.onrender.com/api/getData", {
        method: "POST",
        mode: "cors"
      });
      fetchedData = await fetchedData.json();
      fetchedData = fetchedData[0];
      setDataItems(fetchedData);
      setFetching(false);
    } catch (err) {
      console.log(err);
    }
  }

  

  // Data will be fetched everytime the App.js is re-rendered
  useEffect(() => {
    loadData();
  }, []);

  
  return(
    <div style={{
      height: "100vh",
      // padding: "0 30%",
      margin: "2%",
      border: "1px solid black"
    }}>
      <div className='chart-container'>
      <TimeSeries/>
      </div>
      <div className='chart-container'>
      <SectorBars/>
      </div>
      <div className='chart-container'>
      <RegionBubbles/>
      </div>
      {/* <div style={{
        height: "100%",
        width: "100%"
      }}>
      <RegionScatter/>
      </div> */}
      </div>
  )
  
  
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
        
        { <div className="" id="right-container">
          <Navbar />
          {/* Using Grid */}
          {
          fetching && 
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "84%"
          }}>
            <svg width="100" height="100" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 12L18.1254 16.1694C18.6725 16.5418 19 17.1608 19 17.8227V20.5C19 20.7761 18.7761 21 18.5 21H5.5C5.22386 21 5 20.7761 5 20.5V17.8227C5 17.1608 5.32746 16.5418 5.87462 16.1694L12 12ZM12 12L18.1254 7.83062C18.6725 7.45819 19 6.83917 19 6.17729V3.5C19 3.22386 18.7761 3 18.5 3H5.5C5.22386 3 5 3.22386 5 3.5V6.17729C5 6.83917 5.32746 7.45819 5.87462 7.83062L12 12Z" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15 20.2071V20.85C15 20.9328 14.9328 21 14.85 21H9.15C9.06716 21 9 20.9328 9 20.85V20.2071C9 20.0745 9.05268 19.9473 9.14645 19.8536L11.4343 17.5657C11.7467 17.2533 12.2533 17.2533 12.5657 17.5657L14.8536 19.8536C14.9473 19.9473 15 20.0745 15 20.2071Z" fill="#33363F"/>
<path d="M12 11L17 8H7L12 11Z" fill="#33363F"/>
<path d="M12 18V12" stroke="#33363F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </div>
        }
          { !fetching && <div className='row'>
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
          </div>}
          <Footer/>
        </div>}
      </div>
    </div>
  );
}

export default App;
