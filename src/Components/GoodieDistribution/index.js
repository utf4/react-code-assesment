import React, { useState, useEffect } from "react";
import input from "./sample_input.txt";

function GoodieDistribution() {
  const [employeesCount, setEmployeesCount] = useState(0);
  const [goodies, setGoodies] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    readInputFile();
  }, []);

  const readInputFile = () => {
    fetch(input)
      .then((r) => r.text())
      .then((data) => {
        const lines = data.split("\n");
        const totalEmployees = parseInt(lines[0].match(/\d+/)[0], 10);
        const goodiesData = [];
        for (let i = 2; i < lines.length; i++) {
          const [name, price] = lines[i].split(": ");
          goodiesData.push({ name, price: parseInt(price, 10) });
        }

        // Sort goodies by price
        goodiesData.sort((a, b) => a.price - b.price);

        setGoodies(goodiesData);
        setEmployeesCount(totalEmployees);
      });
  };

  const distributeGoodies = () => {
    // Calculate the minimum price difference
    let minDiff = Infinity;
    let selectedGoodies = [];

    for (let i = 0; i <= goodies.length - employeesCount; i++) {
      const diff = goodies[i + employeesCount - 1].price - goodies[i].price;

      if (diff < minDiff) {
        minDiff = diff;
        selectedGoodies = goodies.slice(i, i + employeesCount);
      }
    }
    let resultString = "The goodies selected for distribution are:\n";
    for (const goodie of selectedGoodies) {
      resultString += `${goodie.name}: ${goodie.price}\n`;
    }

    const priceDifference =
      selectedGoodies[selectedGoodies.length - 1].price -
      selectedGoodies[0].price;
    resultString += `And the difference between the chosen goodie with the highest price and the lowest price is ${priceDifference}`;

    setResult(resultString);
    downloadTxtFile(resultString);
  };

  const downloadTxtFile = (textData) => {
    const element = document.createElement("a");
    const file = new Blob([textData], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "sample_output.txt";
    document.body.appendChild(element); // Required for this to work in Firefox
    element.click();
  };

  return (
    <div>
      <button onClick={() => distributeGoodies(employeesCount, goodies)} style={{ marginTop: '10px'}}  className='styled-button'>
        Goodie Distribution Output
      </button>
      <div>
        <pre>{result}</pre>
      </div>
    </div>
  );
}

export default GoodieDistribution;
