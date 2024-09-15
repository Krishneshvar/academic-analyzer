import { useState, useRef, useEffect } from 'react'
import { Editor } from '@monaco-editor/react'
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

    return(
        <>
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
        </>
    )
}

export default CodeEditor
