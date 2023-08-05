import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";
import { useNavigate } from "react-router-dom";

const WaitingRoom = () => {
    const {room, dispatch: roomDispatch} = useContext(RoomContext);
    const {user, dispatch: userDispatch} = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [countdown, setCountdown] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const submission = {_id: user._id};
            const fetchResponse = await fetch(`/api/rooms/pop/${user.room_name}`, {
              method: 'POST',
              body: JSON.stringify(submission),
              headers:{
                  'Content-Type': 'application/json'
              }
            });
            const room = await fetchResponse.json();
            if(fetchResponse.ok){
              console.log("Response is ok");
              roomDispatch({
                    type:'UPDATE_USERS',
                    payload:{
                        user_ids: room.user_ids,
                        room_state: room.room_state,
                    }
              })
            //   if(room.room_state === 'in progress') navigate('/problem');
            }
            else{
              console.log("Response is not ok")
            }
        }
        if(!user || !room){
            return null;
        }
        fetchUsers();

    }, [])
    useEffect(() => {
        socket.on('new user joining room', ({user, room}) => {
            console.log('Hey someone new is joining my room');
            roomDispatch({
                type:'UPDATE_USERS',
                payload:{
                    user_ids: room.user_ids,
                    room_state: room.room_state,
                }
            })
        })
    }, [])

    useEffect(() => {
        if (room?.room_state === "in progress") {
            const timer = setTimeout(() => {
                navigate("/problem");
            }, 3000);
            setCountdown(3);
            return () => {
                clearTimeout(timer); // Clear the timer on component unmount or when room_state changes
            };
        }
      }, [room?.room_state, navigate]);

    useEffect(() =>{
        let cd;
        if(countdown){
            cd = setInterval(() => setCountdown(countdown-1), 1000);
        }

        return () => {
            clearTimeout(cd); // Clear the timer on component unmount or when room_state changes
        };
    }, [countdown])

    if(!user || !room){
        return null;
    }

    if(countdown){
        return <div className="countdown">{countdown}</div>;
    }

    return(
        <div className="waiting-room-container">
            {/* <h1>Waiting Room</h1>
            <p>Welcome {user.username}</p> */}
            <table className="user-table">
                <thead>
                    <tr>
                        <td id="user-table-header">Users</td>
                    </tr>
                </thead>
                {room.user_ids && room.user_ids.map((user) => (
                    <tr className='user-entry-row' key={user._id}>
                        <td>{user.username}</td>
                    </tr>
                ))}
            </table>
            <div className="waiting-status">
                {room && room.room_state === 'waiting' ? <p className="waiting">Waiting for {room.num_players-room.user_ids.length} more</p> : <p>In Progress</p>}
                <div className="room-name-container">
                    <p className="room-name">Room name: {room.room_name}</p>
                    <button onClick={() => {navigator.clipboard.writeText(room.room_name)}}>Copy</button>
                </div>
            </div>
        </div>
    );
}

export default WaitingRoom;