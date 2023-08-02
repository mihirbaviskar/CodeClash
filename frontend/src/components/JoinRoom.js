import { useContext, useEffect, useState } from "react";
import { SocketContext} from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";
const JoinRoom = () => {

    
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
            console.log(message);
            setError(message.error);
            setErrorFields(message.errorFields)
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
            })
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
            })
            navigate('/waitingroom');
        })
    }, [])

    const handleJoinRoom = async (e) => {
        e.preventDefault();
        console.log(username);
        console.log(room_name);
        socket.emit("join room", {username, room_name});
    }
    return(
        <form onSubmit={handleJoinRoom}>
            <label>Room #:</label>
            <input type="text" className={errorFields.includes('room_name') ? 'error' : '' }onChange={(e) => setRoomName(e.target.value)} value={room_name}/>
            <label>Name:</label>
            <input type="text" className={errorFields.includes('username') ? 'error' : '' } onChange={(e) => setUsername(e.target.value)} value={username}/>
            <button>Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default JoinRoom;