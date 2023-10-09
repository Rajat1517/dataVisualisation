import React from 'react'

export default function Filters(props) {

  return (
    // All the inputs are used to update the filter states of different variables using onChange event
    <div>
        <input className='filter-inputs' type="text" placeholder=' Sector Filter' value={props.sectorFilter} onChange={(e)=>{
          props.setSectorFilter(e.target.value);
        }}/>
        <input className='filter-inputs' type="text" placeholder=' Region Filter' value={props.regionFilter} onChange={(e)=>{
          props.setRegionFilter(e.target.value);
        }}/>
        <input className='filter-inputs' type="text" placeholder=' Pestle Filter' value={props.pestleFilter} onChange={(e)=>{
          props.setPestleFilter(e.target.value);
        }}/>
        <input className='filter-inputs' type="text" placeholder=' Country Filter' value={props.countryFilter} onChange={(e)=>{
          props.setCountryFilter(e.target.value);
        }}/>
         <input className='filter-inputs' type="text" placeholder=' End Year Filter' value={props.endYearFilter} onChange={(e)=>{
          props.setEndYearFilter(e.target.value);
        }}/>
    </div>
  )
}
