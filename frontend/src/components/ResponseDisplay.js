import { useEffect } from "react";

const ResponseDisplay = ({ response, setAccepted}) => {
  useEffect(() => {
    if(response && response.status.id === 3){
      console.log("Accepted setting accepted to true");
      setAccepted(true);
    }
  }, [response]);

  if (!response) {
    return null;
  }

  let descriptionStyle = response.status.id === 3 ? {color:'#2cbb5d'} : {color:'#ef4643'};

  return (
    <div className="response-display">
      {response.exit_code !==153 && response.status.description && <h3 className="submission-status" style={descriptionStyle}>{response.status.description}</h3>}
      {response.exit_code === 153 && <h3 style={descriptionStyle}>Memory Limit Exceeded</h3>}
      {response.status.id === 6 && response.compile_output && <pre className="compiler-error-output">{response.compile_output}</pre>}
      {response.status.id === 11 && response.stdout && <><p className="output-label">stdout</p><pre className="response-output">{response.stdout}</pre></>}
      {response.status.id === 11 && response.stderr && <><p className="output-label">stderr</p><pre className="response-output">{response.stderr}</pre></>}
      {response.status.id === 3 && response.wall_time && <><p className="output-label">Time</p><pre className="response-output" >{response.wall_time}s</pre></>}
      {response.status.id === 3 && response.memory && <><p className="output-label">Memory</p><pre className="response-output" >{response.memory}KB</pre></>}
    </div>
  );
  };
  
  export default ResponseDisplay;