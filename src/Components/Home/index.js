import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="button-container">
      <Link to="/goodies">
        <button className="styled-button">Show Goodies Distribution</button>
      </Link>
      <Link to="/job">
      <button className="styled-button">Show Jobs Distribution</button>
      </Link>
    </div>
  );
}

export default Home;
