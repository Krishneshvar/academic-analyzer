import { useState } from 'react';
import './Card.css';

const Card = ({ algo }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Handle file input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    console.log("File selected:", file); // For debugging purposes
  };

  // Handle Run button click
  const handleRun = async () => {
    if (!selectedFile) {
      alert("Please upload a file before running the algorithm.");
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('algorithm', algo.title); // Send algorithm name as well

    try {
      const response = await fetch('http://localhost:5000/run-algorithm', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log("Server response:", result);
      alert("Algorithm ran successfully! Check the output.");
    } catch (error) {
      console.error("Error while sending data to server:", error);
      alert("There was an error running the algorithm.");
    }
  };

  return (
    <div className="cards">
      <div className="card-content">
        <h1>{algo.title}</h1>
        <p>{algo.description}</p>
      </div>

      <div className="compile-btns">
        <label className="upload-btn">
          Upload
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".csv, .xlsx" // Restrict to CSV and Excel files
          />
          <span className="material-symbols-outlined">upload_file</span>
        </label>

        <button className="run-btn" onClick={handleRun}>
          Run
          <span className="material-symbols-outlined">play_circle</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
