import './CodeEditor.css'
import { Editor } from '@monaco-editor/react'

function CodeEditor() {

    return(
        <>
        <div className="code-editor">
            <Editor 
                height="80dvh"
                theme='vs-dark'
                defaultLanguage='python'
                defaultValue='# some comment'
            />
        </div>
        </>
    )
}

export default CodeEditor
