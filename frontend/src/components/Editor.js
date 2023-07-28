import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useState, useEffect , useRef} from "react";
import ResponseDisplay from './ResponseDisplay';

const Editor = ({_id, starter_code}) => {
  // console.log(starter_code);
  const [code, setCode] = useState(starter_code);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [response, setResponse] = useState(null);
  const editorRef = useRef(null);
  useEffect(() => {
    setCode(starter_code);
  }, [starter_code]);
  useEffect(() => {
    console.log("Response");
    console.log(response);
  }, [response]);

  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current) {
        editorRef.current.layout();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
    editorRef.current = editor;
  }

  const onChange = (newValue, e) => {
    setCode(newValue);
  }

  const handleSubmit = async () => {
    setButtonDisabled(true);
    const submission = {_id, code};
    console.log(_id);
    console.log(code);
    console.log(submission);
    const fetchResponse = await fetch('/api/problems/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
      headers:{
          'Content-Type': 'application/json'
      }
    });
    const json = await fetchResponse.json();
    if(fetchResponse.ok){
      console.log("Response is ok");
      setResponse(json);
      console.log(json);
    }
    else{
      console.log("Response is not ok")
      console.log(json);
    }
    setTimeout(() => {
      setButtonDisabled(false);
    }, 10000);
  }

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    fontSize: 14
  };

  return (
    <div className='editor-container'>
      <div className='editor'>
        <MonacoEditor
          // width="100%"
          // height='67vh'
          language={"cpp"}
          theme={"vs-dark"}
          value={code}
          options={options}
          onChange={onChange}
          editorDidMount={editorDidMount}
        />
        <button className={`submit ${isButtonDisabled ? 'disabled': ''}`} disabled={isButtonDisabled} onClick={handleSubmit}>Submit</button>
      </div>
      <ResponseDisplay response={response} />
    </div>
  );
}

export default Editor;
