import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import LoadingSpinner from "./LoadingSpinner";


const ResponseDisplay = ({ response, accepted, setAccepted, loading, freeze, bomb}) => {
  const {user, dispatch: userDispatch, elapsedTime} = useContext(UserContext);
  const [runTimeScore, setRunTimeScore] = useState(0);
  const [memScore, setMemScore] = useState(0);
  const [solveTimeScore, setSolveTimeScore] = useState(0);
  useEffect(() => {
    if(response && !accepted && response.status.id === 3){
      console.log("Accepted setting accepted to true");
      let calc_runTimeScore = 0;
      if(response.status.id === 3 && response.wall_time){
        calc_runTimeScore = Math.floor(66.5465/((0.227969*response.wall_time) + 0.218194));
        setRunTimeScore(calc_runTimeScore);
      }
      let calc_memScore = 0;
      if(response.status.id === 3 && response.memory){
        calc_memScore = Math.floor(505.524* Math.exp(-0.0000659178*response.memory));
        setMemScore(calc_memScore);
      }
      let calc_solveTime = Math.floor(486.645/((0.00225299*elapsedTime)+1.62215))
      setSolveTimeScore(calc_solveTime);
      let new_problem =  user.current_problem+1;
      let new_score = user.score+calc_runTimeScore+calc_memScore+calc_solveTime;
      userDispatch({
        type:'SET_CURRENT_PROBLEM_AND_SCORE',
        payload: {
          current_problem: new_problem,
          score: new_score
        }
      })
      console.log('accepting in response display');
      setAccepted(true);
    }
  }, [response]);

  if(loading){
    return (
      <div className={`response-display ${freeze ? 'freeze-response-display' : ''} ${bomb ? 'bomb-response-display' : ''}`}>
        <LoadingSpinner/>
      </div>
    );
  }

  if (!response) {
    return null;
  }

  let descriptionStyle = response.status.id === 3 ? {color:'#2cbb5d'} : {color:'#ef4643'};

  return (
    <div className={`response-display ${freeze ? 'freeze-response-display' : ''} ${bomb ? 'bomb-response-display' : ''}`}>
      {response.exit_code !==153 && response.status.description && <h3 className="submission-status" style={descriptionStyle}>{response.status.description}</h3>}
      {response.exit_code === 153 && <h3 style={descriptionStyle}>Memory Limit Exceeded</h3>}
      {response.status.id === 6 && response.compile_output && <pre className="compiler-error-output">{response.compile_output}</pre>}
      {response.status.id === 11 && response.stdout && <><p className="output-label">stdout</p><pre className="response-output">{response.stdout}</pre></>}
      {response.status.id === 11 && response.stderr && <><p className="output-label">stderr</p><pre className="response-output">{response.stderr}</pre></>}
      {response.status.id === 3 && response.wall_time && <><p className="output-label">Run Time</p><pre className="response-output" >{response.wall_time}s</pre></>}
      {response.status.id === 3 && response.memory && <><p className="output-label">Memory</p><pre className="response-output" >{response.memory}KB</pre></>}
      {response.status.id === 3 && response.wall_time && <><p className="output-label">Run Time Bonus</p><pre className="response-output" >{runTimeScore} pts</pre></>}
      {response.status.id === 3 && response.memory && <><p className="output-label">Memory Bonus</p><pre className="response-output" >{memScore} pts</pre></>}
      {response.status.id === 3 && <><p className="output-label">Solve Time Bonus</p><pre className="response-output" >{solveTimeScore} pts</pre></>}
      {response.status.id === 3 && <><p className="output-label">Current Score</p><pre className="response-output" >{user.score} pts</pre></>}
    </div>
  );
  };
  
  export default ResponseDisplay;