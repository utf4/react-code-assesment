import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import GoodieDistribution from "./Components/GoodieDistribution";
import JobDistribution from "./Components/JobDistribution";

function App() {


  return (
    <div className="App">
      <div className="app-container">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/goodies" element={<GoodieDistribution />} />
          <Route path="/job" element={<JobDistribution />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
