import { useContext, useEffect, useState } from "react";
import { SocketContext} from "../context/SocketContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";
const CreateRoom = ({setLoading}) => {

    const socket = useContext(SocketContext);
    const {user, dispatch: userDispatch} = useContext(UserContext);
    const {room, dispatch: roomDispatch} = useContext(RoomContext); 
    const [num_players, setNumPlayers] = useState("");
    const [username, setUsername] = useState("");
    const [diffs, setDiffs] = useState({
        easy: false,
        medium: false,
        hard: false
    })

    const [error, setError] = useState(null);
    const [errorFields, setErrorFields] = useState([""]);
    const navigate = useNavigate();
    useEffect(() => {
        socket.on('error create room', (message) => {
            setLoading(false);
            console.log(message);
            setError(message.error);
            setErrorFields(message.errorFields);
            console.log(error);
            console.log(errorFields);
        })
        socket.on('success create room', ({user, room}) => {
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
                    room_state: room.room_state,
                }
            })
            setLoading(false);
            navigate('/waitingroom');
        })
    },[])



    const handleCheckboxChange = (e) => {
        setDiffs({ ...diffs, [e.target.name]: e.target.checked });
    }

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        console.log(`${username} is joining a room with ${num_players}`);
        const selectedDifficulties = Object.keys(diffs).filter(diff => diffs[diff]);
        console.log(selectedDifficulties);
        socket.emit("create room", {username, diffs:selectedDifficulties, num_players});
        setLoading(true);
    }
    return(
        <form className="room-form" onSubmit={handleCreateRoom}>
            <div className={errorFields.includes('diffs') ? 'error room-item diff-select' : 'room-item diff-select' }>
                <label>
                    <input className="diff-checkbox-easy" type="checkbox" name="easy" checked={diffs.easy} onChange={handleCheckboxChange} />
                    Easy
                </label>
                <label>
                    <input className="diff-checkbox-medium" type="checkbox" name="medium" checked={diffs.medium} onChange={handleCheckboxChange} />
                    Medium
                </label>
                <label>
                    <input className="diff-checkbox-hard" type="checkbox" name="hard" checked={diffs.hard} onChange={handleCheckboxChange} />
                    Hard
                </label>
            </div>
            <div className={errorFields.includes('num_players') ? 'error room-item player-select' : 'room-item player-select'}>
                <select  value={num_players} onChange={(e) => setNumPlayers(e.target.value)} style={{color:num_players === "" ? 'grey' : 'white'}}>
                    <option value="" selected disabled hidden># Players</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <div className={errorFields.includes('username') ? 'error room-item room-input' : 'room-item room-input' }>
                <input type="text" placeholder="Name" onChange={(e) => setUsername(e.target.value)} value={username} maxLength="8"/>
            </div>
            <button className="room-item">Create Room</button>
            {error && <div className="error-msg">{error}</div>}
        </form>
        
    );
}

export default CreateRoom;