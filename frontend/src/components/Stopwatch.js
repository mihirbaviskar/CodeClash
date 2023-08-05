import React, { useState, useEffect, useContext } from "react";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";

const Stopwatch = () => {
    const {room} = useContext(RoomContext);
    const {user, elapsedTime, setElapsedTime} = useContext(UserContext);
    useEffect(() => {
        let interval = setInterval(() => {
            setElapsedTime((prevElapsedTime) => prevElapsedTime + 1);
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log('Changing elapsed time');
        setElapsedTime(0);
    }, [user.current_problem])
    
    const formatTime = (time) => {
        return time.toString().padStart(2, "0");
    };

    const hours = formatTime(Math.floor(elapsedTime / 3600));
    const minutes = formatTime(Math.floor((elapsedTime % 3600) / 60));
    const seconds = formatTime(elapsedTime % 60);
    if(!user || room.room_state !== 'in progress' || user.current_problem > room.num_problems){
        return null;
    }
    return (
        <div className="clock">
        <span>{hours}</span> : <span>{minutes}</span> : <span>{seconds}</span>
        </div>
    );
};

export default Stopwatch;