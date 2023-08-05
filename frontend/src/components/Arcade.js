import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import GameLeaderboard from "./GameLeaderboard";
import { RoomContext } from "../context/RoomContext";
import Stopwatch from "./Stopwatch";

const Arcade = () => {
    const [messages, setMessages] = useState([]);
    const socket = useContext(SocketContext)
    const {dispatch} = useContext(RoomContext);
    useEffect(() => {
        socket.on('user solved problem', (user) => {
            console.log('user sovled a problem');
            console.log(user);
            addMessage(`${user.username} solved problem ${user.current_problem-1} and has ${user.score} pts`);
            dispatch({
                type:'UPDATE_USER',
                payload: user
            });
        });
    }, []);

    const addMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
        console.log("MESSAGE")
    }
    return (
        <div className="arcade">
            <div className="leaderboard-container">
                <GameLeaderboard/>
            </div>
            <div className="message-board-container">
                <p>Message Board</p>
                <ul>
                    {messages && messages.map((message, index) =>
                        <li key={index}>{message}</li>
                    )}
                </ul>
                <Stopwatch/>
            </div>
        </div>
    )
}

export default Arcade;