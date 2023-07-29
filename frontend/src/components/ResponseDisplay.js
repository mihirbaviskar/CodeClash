import { useEffect } from "react";

const ResponseDisplay = ({ response }) => {
  useEffect(() => {
    console.log("Response in ResponseDisplay");
    console.log(response);
  }, [response]);

  if (!response) {
    return null;
  }

  let descriptionStyle = response.status.id === 3 ? {color:'green'} : {color:'red'};

  return (
    <div className="response-display">
      {response.status.exit_code !==153 && response.status.description && <h3 style={descriptionStyle}>{response.status.description}</h3>}
      {response.status.exit_code ===153 && <h3 style={descriptionStyle}>"Memory Limit Exceeded"</h3>}
      {response.status.id === 6 && response.compile_output && <pre className="compiler-error-output">{response.compile_output}</pre>}
      {response.status.id === 11 && response.stdout && <><p className="output-label">stdout</p><pre className="response-output">{response.stdout}</pre></>}
      {response.status.id === 11 && response.stderr && <><p className="output-label">stderr</p><pre className="response-output">{response.stderr}</pre></>}
      {response.status.id === 3 && response.wall_time && <p>Time {response.wall_time}</p>}
      {response.status.id === 3 && response.memory && <p>Memory {response.memory}</p>}
    </div>
  );
  };
  
  export default ResponseDisplay;