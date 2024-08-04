
// import React, { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';
// import 'leaflet.heat';

// const data= [
//   [
//     37.0902,
//     -95.7129,
//     11200
//   ],
//   [
//     23.6345,
//     -102.5528,
//     300
//   ],
//   [
//     9.082,
//     8.6753,
//     600
//   ],
//   [
//     33.8547,
//     35.8623,
//     300
//   ],
//   [
//     61.524,
//     105.3188,
//     2500
//   ],
//   [
//     23.8859,
//     45.0792,
//     1800
//   ],
//   [
//     -11.2027,
//     17.8739,
//     200
//   ],
//   [
//     26.8206,
//     30.8025,
//     600
//   ],
//   [
//     -30.5595,
//     22.9375,
//     300
//   ],
//   [
//     20.5937,
//     78.9629,
//     1900
//   ],
//   [
//     48.3794,
//     31.1656,
//     200
//   ],
//   [
//     40.1431,
//     47.5769,
//     100
//   ],
//   [
//     35.8617,
//     104.1954,
//     2400
//   ],
//   [
//     4.5709,
//     -74.2973,
//     200
//   ],
//   [
//     17.6078,
//     8.0817,
//     200
//   ],
//   [
//     26.3351,
//     17.2283,
//     1000
//   ],
//   [
//     -14.235,
//     -51.9253,
//     500
//   ],
//   [
//     17.5707,
//     -3.9962,
//     100
//   ],
//   [
//     -0.7893,
//     113.9213,
//     900
//   ],
//   [
//     33.2232,
//     43.6793,
//     1100
//   ],
//   [
//     32.4279,
//     53.688,
//     1900
//   ],
//   [
//     7.8627,
//     29.6949,
//     100
//   ],
//   [
//     6.4238,
//     -66.5897,
//     600
//   ],
//   [
//     12.2383,
//     -1.5616,
//     100
//   ],
//   [
//     51.1657,
//     10.4515,
//     300
//   ],
//   [
//     55.3781,
//     -3.436,
//     600
//   ],
//   [
//     29.3117,
//     47.4818,
//     100
//   ],
//   [
//     56.1304,
//     -106.3468,
//     600
//   ],
//   [
//     -38.4161,
//     -63.6167,
//     100
//   ],
//   [
//     36.2048,
//     138.2529,
//     700
//   ],
//   [
//     47.5162,
//     14.5501,
//     100
//   ],
//   [
//     40.4637,
//     -3.7492,
//     200
//   ],
//   [
//     58.5953,
//     25.0136,
//     100
//   ],
//   [
//     47.1625,
//     19.5033,
//     100
//   ],
//   [
//     -25.2744,
//     133.7751,
//     400
//   ],
//   [
//     31.7917,
//     -7.0926,
//     100
//   ],
//   [
//     39.0742,
//     21.8243,
//     100
//   ],
//   [
//     25.3548,
//     51.1839,
//     100
//   ],
//   [
//     21.4735,
//     55.9754,
//     200
//   ],
//   [
//     6.4281,
//     -9.4295,
//     100
//   ],
//   [
//     56.2639,
//     9.5018,
//     100
//   ],
//   [
//     4.2105,
//     101.9758,
//     200
//   ],
//   [
//     30.5852,
//     36.2384,
//     200
//   ],
//   [
//     34.8021,
//     38.9968,
//     200
//   ],
//   [
//     9.145,
//     40.4897,
//     100
//   ],
//   [
//     60.472,
//     8.4689,
//     100
//   ],
//   [
//     7.9465,
//     -1.0232,
//     200
//   ],
//   [
//     48.0196,
//     66.9237,
//     100
//   ],
//   [
//     30.3753,
//     69.3451,
//     100
//   ],
//   [
//     -0.8037,
//     11.6094,
//     100
//   ],
//   [
//     23.4241,
//     53.8478,
//     100
//   ],
//   [
//     28.0339,
//     1.6596,
//     100
//   ],
//   [
//     38.9637,
//     35.2433,
//     100
//   ],
//   [
//     35.1264,
//     33.4299,
//     100
//   ],
//   [
//     17.1899,
//     -88.4976,
//     100
//   ],
//   [
//     51.9194,
//     19.1451,
//     100
//   ]
// ]

// const HeatMap = () => {

//   const HeatmapLayer = ({ data }) => {
//     const map = useMap();

//     useEffect(() => {
//       const heatLayer = L.heatLayer(data, {
//         radius: 20,
//         blur: 15,
//         maxZoom: 17,
//       }).addTo(map);

//       return () => {
//         map.removeLayer(heatLayer);
//       };
//     }, [map, data]);

//     return null;
//   };

//   return (
//     <MapContainer center={[20, 0]} zoom={2} style={{ height: '50vh', width: '100%' }}>
//       <TileLayer
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//       />
//       <HeatmapLayer data={data} />
//     </MapContainer>
//   );
// };

// export default HeatMap;


// src/ChoroplethMap.js

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import geoData from '../countries.geo.json'; // The GeoJSON file for world borders
import { LatLngBounds } from 'leaflet';
// import { countryData, countryCodes } from './data';

const countryCodes = {
  'United States of America': 'USA',
  'Mexico': 'MEX',
  'Nigeria': 'NGA',
  'Lebanon': 'LBN',
  'Russia': 'RUS',
  'Saudi Arabia': 'SAU',
  'Angola': 'AGO',
  'Egypt': 'EGY',
  'South Africa': 'ZAF',
  'India': 'IND',
  'Ukraine': 'UKR',
  'Azerbaijan': 'AZE',
  'China': 'CHN',
  'Colombia': 'COL',
  'Niger': 'NER',
  'Libya': 'LBY',
  'Brazil': 'BRA',
  'Mali': 'MLI',
  'Indonesia': 'IDN',
  'Iraq': 'IRQ',
  'Iran': 'IRN',
  'South Sudan': 'SSD',
  'Venezuela': 'VEN',
  'Burkina Faso': 'BFA',
  'Germany': 'DEU',
  'United Kingdom': 'GBR',
  'Kuwait': 'KWT',
  'Canada': 'CAN',
  'Argentina': 'ARG',
  'Japan': 'JPN',
  'Austria': 'AUT',
  'Spain': 'ESP',
  'Estonia': 'EST',
  'Hungary': 'HUN',
  'Australia': 'AUS',
  'Morocco': 'MAR',
  'Greece': 'GRC',
  'Qatar': 'QAT',
  'Oman': 'OMN',
  'Liberia': 'LBR',
  'Denmark': 'DNK',
  'Malaysia': 'MYS',
  'Jordan': 'JOR',
  'Syria': 'SYR',
  'Ethiopia': 'ETH',
  'Norway': 'NOR',
  'Ghana': 'GHA',
  'Kazakhstan': 'KAZ',
  'Pakistan': 'PAK',
  'Gabon': 'GAB',
  'United Arab Emirates': 'ARE',
  'Algeria': 'DZA',
  'Turkey': 'TUR',
  'Cyprus': 'CYP',
  'Belize': 'BLZ',
  'Poland': 'POL'
};

// const countryData= [
//   {
//     "country": "United States of America",
//     "count": 5600
//   },
//   {
//     "country": "Mexico",
//     "count": 150
//   },
//   {
//     "country": "Nigeria",
//     "count": 300
//   },
//   {
//     "country": "Lebanon",
//     "count": 150
//   },
//   {
//     "country": "Russia",
//     "count": 1250
//   },
//   {
//     "country": "Saudi Arabia",
//     "count": 900
//   },
//   {
//     "country": "Angola",
//     "count": 100
//   },
//   {
//     "country": "Egypt",
//     "count": 300
//   },
//   {
//     "country": "South Africa",
//     "count": 150
//   },
//   {
//     "country": "India",
//     "count": 950
//   },
//   {
//     "country": "Ukraine",
//     "count": 100
//   },
//   {
//     "country": "Azerbaijan",
//     "count": 50
//   },
//   {
//     "country": "China",
//     "count": 1200
//   },
//   {
//     "country": "Colombia",
//     "count": 100
//   },
//   {
//     "country": "Niger",
//     "count": 100
//   },
//   {
//     "country": "Libya",
//     "count": 500
//   },
//   {
//     "country": "Brazil",
//     "count": 250
//   },
//   {
//     "country": "Mali",
//     "count": 50
//   },
//   {
//     "country": "Indonesia",
//     "count": 450
//   },
//   {
//     "country": "Iraq",
//     "count": 550
//   },
//   {
//     "country": "Iran",
//     "count": 950
//   },
//   {
//     "country": "South Sudan",
//     "count": 50
//   },
//   {
//     "country": "Venezuela",
//     "count": 300
//   },
//   {
//     "country": "Burkina Faso",
//     "count": 50
//   },
//   {
//     "country": "Germany",
//     "count": 150
//   },
//   {
//     "country": "United Kingdom",
//     "count": 300
//   },
//   {
//     "country": "Kuwait",
//     "count": 50
//   },
//   {
//     "country": "Canada",
//     "count": 300
//   },
//   {
//     "country": "Argentina",
//     "count": 50
//   },
//   {
//     "country": "Japan",
//     "count": 350
//   },
//   {
//     "country": "Austria",
//     "count": 50
//   },
//   {
//     "country": "Spain",
//     "count": 100
//   },
//   {
//     "country": "Estonia",
//     "count": 50
//   },
//   {
//     "country": "Hungary",
//     "count": 50
//   },
//   {
//     "country": "Australia",
//     "count": 200
//   },
//   {
//     "country": "Morocco",
//     "count": 50
//   },
//   {
//     "country": "Greece",
//     "count": 50
//   },
//   {
//     "country": "Qatar",
//     "count": 50
//   },
//   {
//     "country": "Oman",
//     "count": 100
//   },
//   {
//     "country": "Liberia",
//     "count": 50
//   },
//   {
//     "country": "Denmark",
//     "count": 50
//   },
//   {
//     "country": "Malaysia",
//     "count": 100
//   },
//   {
//     "country": "Jordan",
//     "count": 100
//   },
//   {
//     "country": "Syria",
//     "count": 100
//   },
//   {
//     "country": "Ethiopia",
//     "count": 50
//   },
//   {
//     "country": "Norway",
//     "count": 50
//   },
//   {
//     "country": "Ghana",
//     "count": 100
//   },
//   {
//     "country": "Kazakhstan",
//     "count": 50
//   },
//   {
//     "country": "Pakistan",
//     "count": 50
//   },
//   {
//     "country": "Gabon",
//     "count": 50
//   },
//   {
//     "country": "United Arab Emirates",
//     "count": 50
//   },
//   {
//     "country": "Algeria",
//     "count": 50
//   },
//   {
//     "country": "Turkey",
//     "count": 50
//   },
//   {
//     "country": "Cyprus",
//     "count": 50
//   },
//   {
//     "country": "Belize",
//     "count": 50
//   },
//   {
//     "country": "Poland",
//     "count": 50
//   }
// ]


const HeatMap = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);


  
  const loadCountryData= async ()=>{
    try{
      const res= await fetch("http://localhost:5000/api/get-heat-map");
      const data= await res.json();
      const mapData = geoData;
      mapData.features.forEach((feature) => {
        const countryName = feature.properties.name;
        const countryCode = countryCodes[countryName];
        const countryInfo = data.find((c) => c.country === countryName);
  
        if (countryInfo) {
          feature.properties.count = countryInfo.count;
        } else {
          feature.properties.count = 0;
        }
      });
  
      setGeoJsonData(mapData);
    }catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    loadCountryData();
  },[])

  const getColor = (d) => {

    if(d>800) return "rgb(255,0,0)";
    if(d<50) return "rgb(60,100,0)";
    let dif= ~~(((800-d)/1500)*255);
    return `rgb(${255-dif},${dif},0)`;
  }

  const style = (feature) => {
    return {
      fillColor: getColor(feature.properties.count),
      weight: 2,
      opacity: 1,
      color: 'black',
      dashArray: '3',
      fillOpacity: 0.8,
    };
  }
  const bounds = [
    [-90, -180], // Southwest coordinates
    [90, 180] // Northeast coordinates
  ];

  return (
    <>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true} // Disable zoom controls
        scrollWheelZoom={true} // Disable scroll zoom
        // bounceAtZoomLimits={true}
        // markerZoomAnimation={true}
        dragging={true}
        maxBounds={bounds} // Set max bounds
        maxBoundsViscosity={1.0} // Make the map stick to the bounds
        maxZoom={10}
        minZoom={2}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && <GeoJSON data={geoJsonData} style={style} />}
      </MapContainer>
    </>
  );
}

export default HeatMap;

