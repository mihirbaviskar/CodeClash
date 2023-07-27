import React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useState, useEffect } from "react";

const Editor = ({_id, starter_code}) => {
  // console.log(starter_code);
  const [code, setCode] = useState(starter_code);

  useEffect(() => {
    setCode(starter_code);
  }, [starter_code]);

  const editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    editor.focus();
  }

  const onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    setCode(newValue);
  }

  const handleSubmit = async () => {
    const submission = {_id, code};
    console.log(_id);
    console.log(code);
    console.log(submission);
    const response = await fetch('/api/problems/submit', {
      method: 'POST',
      body: JSON.stringify(submission),
      headers:{
          'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if(response.ok){
      console.log("Response is ok");
      console.log(json);
    }
    else{
      console.log("Response is not ok")
      console.log(json);
    }
  }

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    fontSize: 14
  };

  return (
    <div>
      <MonacoEditor
        width="100%"
        height="100vh"
        language={"cpp"}
        theme={"vs-dark"}
        value={code}
        options={options}
        onChange={onChange}
        editorDidMount={editorDidMount}
      />
      <button className="submit" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Editor;
