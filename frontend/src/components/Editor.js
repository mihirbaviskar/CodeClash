import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useState, useEffect , useRef} from "react";
import ResponseDisplay from './ResponseDisplay';

const Editor = ({_id, starter_code, accepted, setAccepted, setReload}) => {
  // console.log(starter_code);
  const [code, setCode] = useState(starter_code);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [response, setResponse] = useState(null);
  const editorRef = useRef(null);
  useEffect(() => {
    setCode(starter_code);
  }, [starter_code]);
  // useEffect(() => {
  //   console.log("Response");
  //   console.log(response);
  // }, [response]);

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
    if(accepted){
      console.log("Accepted so reloading problem");
      setReload(prev => !prev);
      setAccepted(false);
      setResponse(null);
    }
    else{
      console.log("Not accepted yet so submitting problem");
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
  }

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    fontSize: 14
  };
  let button_name = accepted ? 'Next Question' : 'Submit'; 
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
        <button className={`submit ${isButtonDisabled ? 'disabled': ''}`} disabled={isButtonDisabled} onClick={handleSubmit}>{button_name}</button>
      </div>
      <ResponseDisplay response={response} setAccepted={setAccepted}/>
    </div>
  );
}

export default Editor;
