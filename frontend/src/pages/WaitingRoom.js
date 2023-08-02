import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { UserContext } from "../context/UserContext";
import { RoomContext } from "../context/RoomContext";

const WaitingRoom = () => {
    const {room, dispatch: roomDispatch} = useContext(RoomContext)
    const {user, dispatch: userDispatch} = useContext(UserContext);
    const socket = useContext(SocketContext);
    console.log(socket);
    console.log(socket.rooms);
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
              console.log(room);
            }
            else{
              console.log("Response is not ok")
              console.log(room);
            }
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


    return(
        <div>
            <h1>Waiting Room</h1>
            <p>Welcome {user.username}</p>
            <ul>
                {room.user_ids && room.user_ids.map((user) => (
                    <li key={user._id}>{user.username}</li>
                ))}
            </ul>
            <p>{room.room_state}</p>
        </div>
    );
}

export default WaitingRoom;