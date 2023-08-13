import React, { useState, useEffect, useContext, useRef } from "react";
import { RoomContext } from "../context/RoomContext";
import { UserContext } from "../context/UserContext";

const Stopwatch = () => {
    const {room} = useContext(RoomContext);
    const startTimeRef = useRef(null);
    const absStartTimeRef = useRef(null);
    const {user, elapsedTime, setElapsedTime} = useContext(UserContext);

    useEffect(() => {
        const d = new Date();
        startTimeRef.current = (Math.floor(d.getTime()/1000));
        absStartTimeRef.current = (Math.floor(d.getTime()/1000));
    }, []);


    useEffect(() => {
        let interval = setInterval(() => {
            const d = new Date();
            const new_val = Math.floor(d.getTime()/1000) - startTimeRef.current;
            // console.log('start: ' + startTimeRef.current);
            // console.log('curr: ' + Math.floor(d.getTime()/1000));
            // console.log('New val: ' + new_val);
            setElapsedTime(new_val);
        }, 1000);

        // Cleanup the interval on component unmount
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // console.log('Changing elapsed time');
        setElapsedTime(0);
        const d = new Date();
        startTimeRef.current = (Math.floor(d.getTime()/1000));
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