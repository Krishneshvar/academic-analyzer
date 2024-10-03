import { useState } from 'react';
import './Card.css';

const Card = ({ algo }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle file input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setErrorMessage(''); // Clear error message on new file selection
    console.log("File selected:", file);
  };

  // Handle Run button click
  const handleRun = async () => {
    if (!selectedFile) {
        alert("Please upload a file before running the algorithm.");
        return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('algorithm', algo.title);

    try {
        const response = await fetch('http://localhost:3000/run-algorithm', {
            method: 'POST',
            body: formData,
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Create a blob from the response and trigger download
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'result.pdf'; // Specify the file name
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('Algorithm ran successfully! PDF is downloaded.');
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
        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
      </div>

      <div className="compile-btns">
        <label className="upload-btn">
          Upload
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleFileChange}
            accept=".csv, .xlsx"
          />
          <span className="material-symbols-outlined">
            {selectedFile ? 'check_circle' : 'upload_file'}
          </span>

          {selectedFile && (
            <div className="file-info">
              {selectedFile.name}
            </div>
          )}
        </label>

        <button className="run-btn" onClick={handleRun} disabled={loading}>
          {loading ? 'Running...' : 'Run'}
          <span className="material-symbols-outlined">play_circle</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
