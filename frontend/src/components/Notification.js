import { SocketContext } from "../context/SocketContext";

const { useContext, useState, useEffect } = require("react")
const { MessageContext } = require("../context/MessageContext")

const Notification = () => {
    const {message, dispatch: messageDispatch} = useContext(MessageContext);
    const [currMessage, setCurrMessage] = useState('');
    const socket = useContext(SocketContext);
    useEffect(() => {
        socket.on('user used powerup', (message) => 
        messageDispatch({
            type:'SET_MESSAGE',
            payload: message
        }));
    }, []);

    useEffect(() => {
        setCurrMessage(message);
        let interval = setTimeout(() => setCurrMessage(''), 5000);

        return () => clearInterval(interval);
    }, [message])

    if(!currMessage){
        return null;
    }
    return (
        <div className="notification-container">
            <p className="notification">{currMessage}</p>
        </div>
    )
}

export default Notification;