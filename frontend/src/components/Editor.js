import React, { useContext } from 'react';
import MonacoEditor from 'react-monaco-editor';
import { useState, useEffect , useRef} from "react";
import ResponseDisplay from './ResponseDisplay';
import { UserContext } from '../context/UserContext';
import { SocketContext } from '../context/SocketContext';
import { RoomContext } from '../context/RoomContext';

const Editor = ({_id, starter_code, accepted, setAccepted, setReload}) => {
  // console.log(starter_code);
  const {room} =  useContext(RoomContext);
  const {user} = useContext(UserContext);
  const [code, setCode] = useState(starter_code);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseDisplay, setResponseDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const editorRef = useRef(null);
  useEffect(() => {
    setCode(starter_code);
  }, [starter_code]);

  useEffect(() => {
    handleResize();
  }, [response])

  const handleResize = () => {
    if (editorRef.current) {
      editorRef.current.layout();
    }
  };
  useEffect(() => {

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
      console.log("Accepted so going to next problem");
      setResponse(null);
      setReload(prev => !prev);
      setAccepted(false);
    }
    else{
      console.log("Not accepted yet so submitting problem");
      setButtonDisabled(true);
      setLoading(true);
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
      setResponseDisplay(true);
      setLoading(false);
      setButtonDisabled(false);
    }
  }

  const options = {
    selectOnLineNumbers: true,
    wordWrap: 'on',
    fontSize: 14,
    minimap: { enabled: false }
  };
  let button_name = "";
  if(accepted){
    if(user.current_problem > room.num_problems){
      button_name = 'Finish'
    }
    else{
      button_name = 'Next Question';
    }
  }
  else{
    button_name = 'Submit';
  }
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
      {(response || loading) && <ResponseDisplay response={response} accepted={accepted} setAccepted={setAccepted} loading={loading}/>}
    </div>
  );
}

export default Editor;
