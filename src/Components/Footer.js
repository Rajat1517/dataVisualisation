import React from 'react'
import logo from "../logoCredits.png"
export default function Footer() {
  return (
    <div id="footer-container">
      <footer className="navbar navbar-light" style={{ backgroundColor: "#1C4E80" }}>
        <div className="container" style={{ float: "left" }}>
          <div>
            <a className="navbar-brand" href="#">
              <img src={logo} alt="" width="30" height="24" style={{ borderRadius: "360px", display: "inline-block" }} />
            </a>
            <p style={{ display: "inline-block", color: "white" }}>© 2023 Made by RjM</p>
          </div>
          <div style={{ float: "right", color: "white" }}>
            <p> About | Contact </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

