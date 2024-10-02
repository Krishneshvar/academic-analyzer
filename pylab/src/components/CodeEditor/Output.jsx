import './Output.css'
import executeCode from '../../apiRequest';
import { useState } from 'react';

function Output({ editorRef }) {
    const [output, setOutput] = useState(null);
    const [isError, setIsError] = useState(false);
    const [dataset, setDataset] = useState(null);

    const handleFileUpload = (event) => {
        setDataset(event.target.files[0]);
    };

    async function runCode() {
        const code = editorRef.current.getValue();
        if (!code || !dataset) {
          console.error("Code or dataset is missing");
          return;
        }
    
        try {
          const result = await executeCode(code, dataset);
          setOutput(result.output);
        } catch (error) {
          console.error("Error running code:", error);
        }
    }

    return(
        <>
        <div className='run-btn'>
            <button onClick={runCode}> Run </button>
            <button>
                <label htmlFor="upload-dataset">Upload Dataset</label>
                <input type="file" id="upload-dataset" style={{ display: "none" }} onChange={handleFileUpload} />
                <img src="/down-arrow.png" alt="Down Arrow" />
            </button>

        </div>
        <div className="output-container" style={{border: isError ? "1px solid red" : "1px solid gray"}}>
            {
                output ? output : <i> The output of the code will be displayed here... </i>
            }
        </div>
        </>
    )
}

export default Output
