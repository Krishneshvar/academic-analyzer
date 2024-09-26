import './Output.css'
import executeCode from '../../apiRequest';
import { useState } from 'react';

function Output({ editorRef }) {
    const [output, setOutput] = useState(null);
    const [isError, setIsError] = useState(false);

    async function runCode() {
        const code = editorRef.current.getValue();
        if (!code) return;

        try {
            const {run:result} = await executeCode(code);
            setOutput(result.output)
            result.stderr ? setIsError(true) : setIsError(false)
        }
        catch (error) { console.log(error) }
        finally {}
    }

    return(
        <>
        <div className='run-btn'>
            <button onClick={runCode}> Run </button>
            <button>
                Upload Dataset
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
