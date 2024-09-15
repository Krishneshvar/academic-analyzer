import { useState, useRef } from 'react'
import { Editor } from '@monaco-editor/react'
import './CodeEditor.css'

function CodeEditor() {
    const editorRef = useRef();
    const [value, setValue] = useState('');

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
    }

    return(
        <>
        <div className="code-editor">
            <Editor 
                height='80dvh'
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue='# some comment'
                value={value}
                onChange={(value) => setValue(value)}
                onMount={onMount}
            />
        </div>
        </>
    )
}

export default CodeEditor
