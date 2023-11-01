import React, { useState } from "react";

function JobDistribution() {
  const [jobs, setJobs] = useState([]);
  const [availableJobs, setAvailableJobs] = useState(0);
  const [otherEarnings, setOtherEarnings] = useState(0);

  const handleCalculate = () => {
    const inputText = document.getElementById("inputText").value;
    const jobValue = document.getElementById("jobs").value;
    const lines = inputText.split("\n");
    const n = parseInt(jobValue);

    let remainingJobs = [];
    let earningsForOthers = 0;

    for (let i = 0; i <= 3 * n; i += 3) {
      let startTime = lines[i];
      const endTime = lines[i + 1];
      const profit = parseInt(lines[i + 2]);

      if (i === 0) {
        remainingJobs.push({ startTime, endTime, profit });
        earningsForOthers += profit;
      } else {
        let canAssign = true;
        for (let j = 0; j < remainingJobs.length; j++) {
          const { startTime: s, endTime: e } = remainingJobs[j];
          if (parseInt(startTime) < parseInt(e) && parseInt(endTime) > parseInt(s)) {
            canAssign = false;
            break;
          }
        }

        if (canAssign && startTime) {

             remainingJobs.push({ startTime, endTime, profit });
            earningsForOthers += profit;
        }
      }
    }
    remainingJobs.forEach((job) => {
        let sTime =  job.startTime.split('');
        let eTime = job.endTime.split('');
        job.startTime = `${sTime[0]}${sTime[1]}:${sTime[2]}${sTime[3]}`;
        job.endTime = `${eTime[0]}${eTime[1]}:${eTime[2]}${eTime[3]}`;
      });
    setJobs(remainingJobs);
    setAvailableJobs(remainingJobs.length);
    setOtherEarnings(earningsForOthers);
  };

  return (
    <div>
      <div>
        <p className="label">Enter the number of Jobs</p>
        <input type="number" className="form-control" style={{ width: '250px'}} id="jobs" placeholder="Enter the number of Jobs" />
      </div>
      <p className="label" style={{marginLeft: '-7%'}}>Enter job start time, end time, and earnings</p>
      <textarea
        id="inputText"
        rows="10"
        cols="30"
        className="form-control"
        placeholder="Enter input here"
        style={{ width: '250px'}} 
      />
      <br />
      <button onClick={handleCalculate} className='styled-button'>Calculate</button>
      <div>
        <h2>Remaining Jobs</h2>
        <ul>
          {jobs.map((job, index) => (
            <li key={index}>
              Start Time: {`${job.startTime}${job.startTime.split(":")[0] > 12 ? 'PM': 'AM'}`}, End Time: {`${job.endTime}${job.endTime.split(":")[0] > 12 ? 'PM': 'AM'}`}, Profit:{" "}
              {job.profit}
            </li>
          ))}
        </ul>
        <h2>The number of tasks and earnings available for others</h2>
        <p>Tasks: {availableJobs}</p>
        <p>Earnings: {otherEarnings}</p>
      </div>
    </div>
  );
}

export default JobDistribution;
