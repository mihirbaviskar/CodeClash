import { useContext, useEffect, useState } from "react";
import { SocketContext} from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";
const JoinRoom = ({setLoading}) => {

    
    const socket = useContext(SocketContext);
    const {user, dispatch:userDispatch} = useContext(UserContext);
    const {room, dispatch:roomDispatch} = useContext(RoomContext);
    const [room_name, setRoomName] = useState("");
    const[username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const [errorFields, setErrorFields] = useState([""]);
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('error join room', (message) => {
            setLoading(false);
            setError(message.error);
            setErrorFields(message.errorFields);            
        })
        socket.on('success join room', ({user, room}) => {
            userDispatch({
                type:'SET_USER',
                payload: {
                    _id: user._id,
                    socket_id:socket.id,
                    username: user.username,
                    room_name: user.room_name,
                    score: 0,
                    current_problem: 1
                }
            });
            localStorage.setItem('userId', user._id);
            roomDispatch({
                type:'SET_ROOM',
                payload:{
                    room_name:room.room_name,
                    num_players: room.num_players,
                    diffs: room.diffs,
                    num_problems: room.num_problems,
                    user_ids: room.user_ids,
                    problem_ids: room.problem_ids,
                    room_state: room.room_state
                }
            });
            setLoading(false);
            navigate('/waitingroom');
        })
    }, [])

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(username);
        console.log(room_name);
        socket.emit("join room", {username, room_name});
    }
    return(
        <form className="room-form" onSubmit={handleJoinRoom}>
            <div className={errorFields.includes('room_name') ? 'error room-item room-input' : 'room-item room-input' }>
                <input type="text" placeholder="Room #" onChange={(e) => setRoomName(e.target.value)} value={room_name} maxLength="8"/>
            </div>
            <div className={errorFields.includes('username') ? 'error room-item room-input' : 'room-item room-input' }>
                <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)} value={username} maxLength="8"/>
            </div>
            <button className="room-item">Join Room</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
    );
}

export default JoinRoom;