import { useState } from "react";
import GameLeaderboard from "./GameLeaderboard";
import Stopwatch from "./Stopwatch";
import PowerupGrid from "./PowerupGrid";
import Notification from "./Notification";

const Arcade = ({freeze, bomb}) => {
    const [error, setError] = useState('');
    const [errorFields, setErrorFields] = useState('');
    
    return (
        <div className={`arcade ${freeze ? 'freeze-arcade' : ''} ${bomb ? 'bomb-arcade' : ''}`}>
            <div className="leaderboard-container">
                <GameLeaderboard error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            </div>
            <div className="powerup-interface-container">
                <PowerupGrid error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            </div>
            <Stopwatch/>
            <Notification/>
        </div>
    )
}

export default Arcade;