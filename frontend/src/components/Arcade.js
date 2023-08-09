import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import GameLeaderboard from "./GameLeaderboard";
import { RoomContext } from "../context/RoomContext";
import Stopwatch from "./Stopwatch";
import Money from "./Money";
import PowerupGrid from "./PowerupGrid";
import Notification from "./Notification";
import { MessageContext } from "../context/MessageContext";

const Arcade = ({freeze, bomb}) => {
    const [messages, setMessages] = useState([]);
    const socket = useContext(SocketContext)
    const {dispatch} = useContext(RoomContext);
    const {dispatch: messageDispatch}= useContext(MessageContext);
    const {place} = useContext(UserContext);
    const [error, setError] = useState('');
    const [errorFields, setErrorFields] = useState('');
    useEffect(() => {
        socket.on('user solved problem', (user) => {
            console.log('user sovled a problem');
            console.log(user);
            const message = `${user.username} solved problem ${user.current_problem-1}`;
            dispatch({
                type:'UPDATE_USER',
                payload: user
            });
            console.log(message)
            messageDispatch({
                type:'SET_MESSAGE',
                payload: message
            });
        });
    }, []);

    const addMessage = (message) => {
        setMessages(prevMessages => [...prevMessages, message]);
        console.log("MESSAGE")
    }
    return (
        <div className={`arcade ${freeze ? 'freeze-arcade' : ''} ${bomb ? 'bomb-arcade' : ''}`}>
            <div className="leaderboard-container">
                <GameLeaderboard error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            </div>
            {/* <div className="message-board-container">
                <p>Message Board</p>
                <p>{place}</p>
                <ul>
                    {messages && messages.map((message, index) =>
                        <li key={index}>{message}</li>
                    )}
                </ul>
            </div> */}
            <div className="powerup-interface-container">
                <PowerupGrid error={error} setError={setError} errorFields={errorFields} setErrorFields={setErrorFields}/>
            </div>
            <Stopwatch/>
            <Notification/>
        </div>
    )
}

export default Arcade;