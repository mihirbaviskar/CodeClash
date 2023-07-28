import { useEffect } from "react";

const ResponseDisplay = ({ response }) => {
  useEffect(() => {
    console.log("Response in ResponseDisplay");
    console.log(response);
  }, [response]);

  if (!response) {
    // return (
    //   <div className="response-display">
    //     <h2>Submission Result</h2>
    //       <p></p>
    //       <p></p>
    //       <p></p>
    //       <p></p>
    //       <p></p>
    //       <p></p>
    //   </div>
    // );
    return null;
  }

  return (
    <div className="response-display">
      <h2>Submission Result</h2>
      {response.status.description && <p>{response.status.description}</p>}
      {response.compile_output && <p>Compiler: {response.compile_output}</p>}
      {response.stdout && <p>Output: {response.stdout}</p>}
      {response.stderr && <p>Error Output: {response.stderr}</p>}
      {response.wall_time && <p>Time: {response.wall_time}</p>}
      {response.memory && <p>Memory: {response.memory}</p>}
    </div>
  );
  };
  
  export default ResponseDisplay;