import React from 'react'


export default function Navbar() {
    return (
        <div id="navbar-container">
            <nav className="navbar navbar-light" style= {{backgroundColor: "#1C4E80"}}>
                <div className="container-fluid" >
                    <a style={{color: "white"}} className="navbar-brand" href="#">
                            DATA ANALYTICS
                    </a>
                    <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
                </div>
            </nav>
        </div>
    )
}
