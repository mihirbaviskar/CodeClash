import React, { useContext } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { useState, useEffect , useRef} from "react";
import ResponseDisplay from './ResponseDisplay';
import { UserContext } from '../context/UserContext';
import { RoomContext } from '../context/RoomContext';
import restart_icon from '../images/restart.svg'
import './Resize';
import { SocketContext } from '../context/SocketContext';
const Editor = ({_id, starter_code, accepted, setAccepted, setReload, freeze, bomb}) => {
  // console.log(starter_code);
  const socket = useContext(SocketContext);
  const {room} =  useContext(RoomContext);
  const {user, dispatch: userDispatch} = useContext(UserContext);
  const [code, setCode] = useState(starter_code);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseDisplay, setResponseDisplay] = useState(false);
  const [loading, setLoading] = useState(false);
  const editorRef = useRef(null);
  const newScore = useRef(0);
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
    // console.log('editorDidMount', editor);
    editor.focus();
    editorRef.current = editor;
    console.log('onMount: the editor instance:', editor);
    console.log('onMount: the monaco instance:', monaco);
    options.automaticLayout = false;
  }

  function removeLines(str) {
    // Split the string into an array of lines
    const lines = str.split('\n');
    if(lines.length < 3) return '';
    // Generate a random line number
    const randomLine = Math.floor(Math.random() * (lines.length - 3));
  
    // Remove 3 lines starting from the random line number
    lines.splice(randomLine, 3);
  
    // Join the array back into a string
    return lines.join('\n');
  }
  useEffect(() => {
    // console.log(bomb);
    if(bomb){
      const new_code = removeLines(code);
      setCode(new_code);
      if (editorRef.current) {
        console.log('yes editor ref exists');
        const model = editorRef.current.getModel();
        if (model) {
          model.setValue(new_code);
        }
      }
    }
  }, [bomb])

  const onChange = (newValue, e) => {
    // console.log(freeze);
    if(!freeze){
      setCode(newValue);
    }
    else{
      // console.log('freeze');
    }
  }
  const handleSubmit = async () => {
    if(accepted){
      // console.log("Accepted so going to next problem");
      console.log("new problem is " + (user.current_problem+1));
      // what is the purpose of setReload?
      console.log("new score is " + newScore.current);
      const updatedUser = {
        ...user,
        current_problem: user.current_problem + 1,
        score: newScore.current
      };
      userDispatch({
        type:'SET_CURRENT_PROBLEM_AND_SCORE',
        payload: {
          current_problem: updatedUser.current_problem,
          score: updatedUser.score
        }
      });
      console.log('Code has been accepted');
      console.log(updatedUser);
      socket.emit('game solve message', updatedUser);
      setResponse(null);
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
    minimap: { enabled: false },
    readOnly: freeze,
    automaticLayout: true
  };

  let button_name = "";
  if(accepted){
    if(user.current_problem >= room.num_problems){
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
      <div className='editor-bar'>
        <button onClick={() => setCode(starter_code)} data-icon="Reset Code">
          <img src={restart_icon} alt="restart-icon"/>
        </button>
      </div>
      <div className={`editor ${freeze ? 'freeze-editor' : ''} ${bomb ? 'bomb-editor' : ''}`} id="container">
        <MonacoEditor
          width="100%"
          // height='67vh'
          defaultLanguage='cpp'
          theme="vs-dark"
          value={code}
          options={options}
          onChange={onChange}
          onMount={editorDidMount}
        />
        <button className={`submit ${isButtonDisabled ? 'disabled': ''}`} disabled={isButtonDisabled} onClick={handleSubmit}>{button_name}</button>
      </div>
      {(response || loading) && <ResponseDisplay response={response} accepted={accepted} setAccepted={setAccepted} loading={loading} freeze={freeze} bomb={bomb} newScore={newScore}/>}
    </div>
  );
}

export default Editor;




