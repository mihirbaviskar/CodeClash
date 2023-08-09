import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";

const Money = ({errorFields}) => {
    // const [intervalTime, setIntervalTime] = useState(1000); // Initial interval time is 1000ms (12 second)
    const {place, money, setMoney} = useContext(UserContext);
    const {room}  = useContext(RoomContext);
    const intervalRef = React.useRef(null);
    useEffect(() => {

        clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
        setMoney((prevCount) => prevCount + 1);
        }, Math.floor(1000*(room.num_players/place)));
    }, [place])

    return (
        <div className="money-container">
            <p className={errorFields === 'money' ? 'error-money money' : 'money'}>${money}</p>
        </div>
    );
};

export default Money;
