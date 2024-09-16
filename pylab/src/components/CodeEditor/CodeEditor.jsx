import { useState, useRef, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
import Output from './Output';
import executeCode from '../../apiRequest';
import './CodeEditor.css'

function CodeEditor({ code, fileName }) {
    const editorRef = useRef();
    const [value, setValue] = useState(code || '');

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    useEffect(() => {
        setValue(code);
    }, [code]);

    async function runCode() {
        const code = editorRef.current.getValue();
        if (!code) return;

        try {
            await executeCode(code)
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <>
        <div className="code-display">
            <div className="code-editor">
                <div className='info'>
                    <p> { fileName } </p>
                </div>
                <Editor 
                    height='75dvh'
                    theme='vs-dark'
                    defaultLanguage='python'
                    value={value}
                    onChange={(value) => setValue(value)}
                    onMount={onMount}
                />
            </div>
            <div className='output-display'>
                <Output editorRef={editorRef}/>
            </div>
        </div>
        </>
    )
}

export default CodeEditor
