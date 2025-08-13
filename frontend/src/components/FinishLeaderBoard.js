import { useContext, useEffect, useState } from "react";
import { RoomContext } from "../context/RoomContext";
import Box from "./Box";
import { UserContext } from "../context/UserContext";
import { SocketContext } from "../context/SocketContext";
import { useNavigate } from "react-router-dom";


const FinishGameLeaderboard = () => {
    const {room, dispatch} = useContext(RoomContext);
    const {user} = useContext(UserContext);
    const [place, setPlace] = useState(null);
    const [placeString, setPlaceString] = useState(null);
    const navigate = useNavigate();
    if(!room || !room.room_state || room.room_state !== 'finished'){
        navigate('/');
    }
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.on('user solved problem', (user) => {
            dispatch({
                type:'UPDATE_USER',
                payload: user
            });
        });
    }, []);        
    const compare = (a, b) => {
        if ( a.score < b.score ){
            return 1;
        }
        if ( a.score > b.score ){
            return -1;
        }
        return 0;
    }


    useEffect(() => {
        if(room.user_ids){
            room.user_ids.sort(compare);
            for(let i = 0; i<room.user_ids.length; i++){
                if(room.user_ids[i]._id === user._id){
                    // console.log(i);
                    setPlace(i+1);
                }
            }
        }
    }, [room])

    useEffect(() => {
        switch(place){
            case 1:
                setPlaceString("st");
                break;
            case 2:
                setPlaceString("nd");
                break;
            case 3:
                setPlaceString("rd");
                break;
            default:
                setPlaceString("th");
                break;
        }
    }, [place]);



    return (
        <div className="leaderboard-finish-container">
            <div className="leaderboard leaderboard-finish">
                {room.user_ids && room.user_ids.length !==0 && room.user_ids.map((user, index) => (
                        <Box rank={index+1} username={user.username} score={user.score} socket_id={user.socket_id}/>
                ))}
            </div>
            {place && <p className="finish-message">{place}{placeString}</p>}
        </div>
    );
}

export default FinishGameLeaderboard;