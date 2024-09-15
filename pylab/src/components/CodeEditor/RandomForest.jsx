import { useState, useEffect } from "react";
import CodeEditor from "./CodeEditor"

function RandomForest() {
    const [fileContent, setPythonFileContent] = useState('');

    useEffect(() => {
        fetch('/Algorithms/RandomForest.py')
        .then((response) => {
            if (response.ok) {
            return response.text();
            }
            throw new Error('Error fetching Python file');
        })
        .then((text) => {
            setPythonFileContent(text);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, []);

    return(
        <>
        <CodeEditor code={fileContent} />
        </>
    )
}

export default RandomForest
